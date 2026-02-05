const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const data = require('./data.js');

const PORT = process.env.PORT || 3000;

// Static file serving helper
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.avif': 'image/avif',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
    // Security: Basic path sanitization and blocking
    const sanitizedUrl = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(__dirname, sanitizedUrl);

    if (sanitizedUrl === '/' || sanitizedUrl === '\\') {
        filePath = path.join(__dirname, 'index.html');
    }

    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname];
    const basename = path.basename(filePath);

    // Block sensitive files and allow only specific extensions
    if (['server.js', 'data.js', 'package.json', 'package-lock.json'].includes(basename) || basename.startsWith('.') || !contentType) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error', 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// WebSocket Server
const wss = new WebSocket.Server({ server });

// Room Management
class Room {
    constructor(code, hostId) {
        this.code = code;
        this.hostId = hostId;
        this.gameState = JSON.parse(JSON.stringify(data.initialGameState));
        this.teams = JSON.parse(JSON.stringify(data.teams));

        // Add isUncapped property
        const uncappedSet = data.uncappedPlayers;
        this.gameState.availablePlayers.forEach(p => {
            p.isUncapped = uncappedSet.has(p.name);
        });

        this.clients = new Map(); // ws -> { id, name, teamCode }
        this.teamOwners = new Map(); // teamCode -> ws
        this.timer = null;
        this.timeLeft = 8;
        this.TIMER_DURATION = 8;

        // Constants
        this.MAX_MARQUEE_SPEND = 60;
        this.MAX_MARQUEE_COUNT = 5;
    }

    broadcast(type, payload) {
        const message = JSON.stringify({ type, payload });
        this.clients.forEach((_, client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    sendStateUpdate() {
        this.broadcast('STATE_UPDATE', {
            gameState: this.gameState,
            teams: this.teams,
            teamOwners: Array.from(this.teamOwners.keys()),
            isHost: false // Client will check local ID against host ID? No, safer to send specific flag per client or just broadcast host ID
        });
    }

    addToAuctionLog(message, color = 'text-gray-300') {
        const entry = { message, color, time: new Date().toLocaleTimeString() };
        this.gameState.auctionLog.unshift(entry);
        if (this.gameState.auctionLog.length > 50) this.gameState.auctionLog.pop();
        this.broadcast('AUCTION_LOG', entry);
    }

    pickNextPlayer() {
        const { marqueeNames, battersNames, wktNames, allrounderNames, bowlersNames } = data;
        const { availablePlayers } = this.gameState;

        const getAvailable = (names) => availablePlayers.filter(p => names.includes(p.name));

        let availableSet = getAvailable(marqueeNames);
        if (availableSet.length === 0) availableSet = getAvailable(battersNames);
        if (availableSet.length === 0) availableSet = getAvailable(wktNames);
        if (availableSet.length === 0) availableSet = getAvailable(allrounderNames);
        if (availableSet.length === 0) availableSet = getAvailable(bowlersNames);
        if (availableSet.length === 0) {
             availableSet = availablePlayers.filter(p =>
                !marqueeNames.includes(p.name) &&
                !battersNames.includes(p.name) &&
                !wktNames.includes(p.name) &&
                !allrounderNames.includes(p.name) &&
                !bowlersNames.includes(p.name)
             );
        }

        if (availableSet.length === 0) {
            this.endAuction();
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableSet.length);
        this.gameState.currentPlayer = availableSet[randomIndex];
        this.gameState.currentBid = this.gameState.currentPlayer.basePrice;
        this.gameState.biddingTeam = null;

        const removeIndex = this.gameState.availablePlayers.findIndex(p => p.id === this.gameState.currentPlayer.id);
        if (removeIndex !== -1) {
            this.gameState.availablePlayers.splice(removeIndex, 1);
        }

        this.startTimer();
        this.sendStateUpdate();
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        this.timeLeft = this.TIMER_DURATION;

        this.broadcast('TIMER_UPDATE', { timeLeft: this.timeLeft });

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.broadcast('TIMER_UPDATE', { timeLeft: this.timeLeft });

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.sellPlayer();
            } else {
                 // AI Logic
                 if (Math.random() < (this.timeLeft > 3 ? 0.3 : 0.5)) {
                     this.placeAIBid();
                 }
            }
        }, 1000);
    }

    placeAIBid() {
        if (!this.gameState.auctionActive) return;

        const { playerRatings, marqueeNames, battersNames, wktNames, allrounderNames, bowlersNames, IDEAL_SQUAD } = data;
        const player = this.gameState.currentPlayer;
        const rating = playerRatings[player.name] || 75;
        const isMarquee = marqueeNames.includes(player.name);

        let roleKey = player.role;
        if (roleKey === "Batsman") roleKey = "Batter";

        const maxPerRole = { Batter: 7, "Wicketkeeper": 4, "All-rounder": 6, Bowler: 8 };
        // const minPerRole = { Batter: 5, "Wicketkeeper": 2, "All-rounder": 4, Bowler: 5 }; // Unused in logic trace but good reference

        let maxAIBid;
        const minMarqueeBid = 10;

        // Find eligible AI teams (teams NOT owned by a client)
        const ownedTeamCodes = Array.from(this.teamOwners.keys());

        // Helper to check marquee cap
        const getMarqueeStats = (teamCode) => {
             const team = this.teams[teamCode];
             return { spend: team.marqueeSpend || 0, count: team.marqueeCount || 0 };
        };

        // Calculate pending marquee stats including current leading bid
        // Simplified: we check stats at moment of bid. If current leader is AI, we must account for their potential spend?
        // Logic from original code iterates and adds pending spend.
        const pendingMarquee = {};
        for (const [code, team] of Object.entries(this.teams)) {
            pendingMarquee[code] = {
                spend: team.marqueeSpend || 0,
                count: team.marqueeCount || 0
            };
        }

        // Add currently winning bid if it's a marquee player
        if (this.gameState.biddingTeam && isMarquee) {
             pendingMarquee[this.gameState.biddingTeam].spend += this.gameState.currentBid;
             pendingMarquee[this.gameState.biddingTeam].count += 1;
        }

        if (isMarquee) {
            let base = 7;
            let multiplier = 1.2;
            let randomFactor = Math.random() * 2;

            if (["Virat Kohli", "Rohit Sharma", "Jasprit Bumrah"].includes(player.name)) {
                base = 18;
                multiplier = 1.5;
                randomFactor = 2 + Math.random() * 2;
            }

            maxAIBid = base + Math.max(0, (rating - 90) * multiplier) + randomFactor;
            maxAIBid = Math.min(maxAIBid, 27);

            const eligibleTeams = Object.entries(this.teams)
                .filter(([code, team]) =>
                    !ownedTeamCodes.includes(code) && // MUST BE AI
                    code !== this.gameState.biddingTeam && // Don't bid against self
                    team.budget >= this.gameState.currentBid + 0.5 &&
                    (pendingMarquee[code].spend + (this.gameState.currentBid + 0.5) <= this.MAX_MARQUEE_SPEND) &&
                    (pendingMarquee[code].count < this.MAX_MARQUEE_COUNT) &&
                    team.players.length < 25
                );

            if (this.gameState.currentBid + 0.5 <= Math.max(minMarqueeBid, maxAIBid)) {
                if (eligibleTeams.length > 0) {
                    const [teamCode, team] = eligibleTeams[Math.floor(Math.random() * eligibleTeams.length)];
                    this.executeBid(teamCode, this.gameState.currentBid + 0.5);
                }
            }
        } else {
            // Non-Marquee Logic
            // Calculate Desperation
             const affordableTeams = Object.entries(this.teams)
                .filter(([code, team]) => {
                    if (ownedTeamCodes.includes(code)) return false; // User teams don't autodraft
                    if (team.budget < this.gameState.currentBid + 0.5) return false;
                    if (this.gameState.biddingTeam === code) return false;

                    let counts = { Batter: 0, "Wicketkeeper": 0, "All-rounder": 0, Bowler: 0 };
                    team.players.forEach(p => {
                        let r = p.role === "Batsman" ? "Batter" : p.role;
                        if(counts[r] !== undefined) counts[r]++;
                    });

                    return counts[roleKey] < maxPerRole[roleKey];
                });

            if (affordableTeams.length === 0) return;

             affordableTeams.forEach(([code, team]) => {
                let counts = { Batter: 0, "Wicketkeeper": 0, "All-rounder": 0, Bowler: 0 };
                team.players.forEach(p => {
                     let r = p.role === "Batsman" ? "Batter" : p.role;
                     if(counts[r] !== undefined) counts[r]++;
                });
                team.desperation = IDEAL_SQUAD[roleKey] - counts[roleKey];
            });

            affordableTeams.sort((a, b) => b[1].desperation - a[1].desperation);
            const maxDesperation = affordableTeams[0][1].desperation;
            const desperateTeams = affordableTeams.filter(([code, team]) => team.desperation === maxDesperation);
            const isDesperate = maxDesperation >= 2;
            const selectedTeams = isDesperate ? desperateTeams : affordableTeams;

            // Max Bid Calc
            if (rating >= 98) {
                maxAIBid = Math.min(24, Math.max(player.basePrice * (isDesperate ? 12 : 10.5), player.basePrice + 8));
            } else if (rating >= 95) {
                maxAIBid = Math.min(16, Math.max(player.basePrice * (isDesperate ? 8 : 6.6), player.basePrice + 6));
            } else if (rating >= 90) {
                maxAIBid = Math.min(12, Math.max(player.basePrice * (isDesperate ? 6 : 4.5), player.basePrice + 4));
            } else if (rating >= 85) {
                maxAIBid = Math.min(9, Math.max(player.basePrice * (isDesperate ? 4.5 : 3), player.basePrice + 2.5));
            } else if (rating >= 80) {
                maxAIBid = Math.min(6, Math.max(player.basePrice * (isDesperate ? 3 : 1.5), player.basePrice + 1.5));
            } else {
                maxAIBid = Math.min(5, Math.max(player.basePrice * (isDesperate ? 2.5 : 1), player.basePrice + 1));
            }
            if (isDesperate) maxAIBid += 1;

            // Pick a team
            if (selectedTeams.length > 0) {
                 const randomIndex = Math.floor(Math.random() * selectedTeams.length);
                 const [teamCode, team] = selectedTeams[randomIndex];

                 // Bid Increase Logic
                 let bidIncrease;
                 if (isDesperate) bidIncrease = 1 + Math.random() * 2;
                 else if (maxDesperation === 1) bidIncrease = 0.75 + Math.random() * 1.5;
                 else if (rating >= 98) bidIncrease = 0.5 + Math.random() * 1.5;
                 else bidIncrease = 0.25 + Math.random() * 0.5;

                 let newBid = this.gameState.currentBid + Math.round(bidIncrease * 2) / 2;

                 if (newBid <= maxAIBid && newBid <= team.budget && newBid <= 20) {
                     this.executeBid(teamCode, newBid);
                 }
            }
        }
    }

    executeBid(teamCode, amount) {
        this.gameState.currentBid = amount;
        this.gameState.biddingTeam = teamCode;
        this.addToAuctionLog(`${this.teams[teamCode].name} bid ₹${amount} Cr`, 'text-blue-300'); // Green for AI? Or Blue?
        // Reset timer
        this.startTimer(); // Reset to 8s
        this.sendStateUpdate();
        this.broadcast('BID_PLACED', { team: teamCode, amount });
    }

    sellPlayer() {
        const player = this.gameState.currentPlayer;

        // Guarantee Minimum AI Bid for Marquee if no one bid
        const isMarquee = data.marqueeNames.includes(player.name);
        if (isMarquee && this.gameState.currentBid < 10 && !this.gameState.biddingTeam) {
             // Logic to force sell to AI? Or just let it go unsold?
             // Original code forced a sale to AI.
             // We can implement this if needed, but for now stick to standard flow.
        }

        if (this.gameState.biddingTeam) {
            const teamCode = this.gameState.biddingTeam;
            const team = this.teams[teamCode];
            const price = this.gameState.currentBid;

            team.budget -= price;
            team.players.push({ ...player, boughtFor: price });
            this.gameState.soldPlayers.push({ player, team: teamCode, price });

            if (isMarquee) {
                team.marqueeSpend = (team.marqueeSpend || 0) + price;
                team.marqueeCount = (team.marqueeCount || 0) + 1;
            }

            this.addToAuctionLog(`${player.name} SOLD to ${team.name} for ₹${price} Cr`, 'text-green-400');
            this.broadcast('SOLD_PLAYER', { player, team: teamCode, price });
        } else {
            this.addToAuctionLog(`${player.name} went UNSOLD`, 'text-red-400');
            this.broadcast('UNSOLD_PLAYER', { player });
        }

        this.sendStateUpdate();
        setTimeout(() => {
            this.gameState.currentRound++;
            this.pickNextPlayer();
        }, 2000);
    }

    endAuction() {
        this.gameState.auctionActive = false;
        this.broadcast('AUCTION_END', {});
        this.addToAuctionLog('Auction Concluded!', 'text-yellow-300 font-bold');
    }
}

const rooms = new Map();

wss.on('connection', (ws) => {
    const clientId = uuidv4();
    // Initially not in any room

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            const { type, payload } = data;

            switch (type) {
                case 'CREATE_ROOM':
                    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                    const newRoom = new Room(roomCode, clientId);
                    rooms.set(roomCode, newRoom);

                    newRoom.clients.set(ws, { id: clientId, name: payload.name || 'Host' });

                    ws.send(JSON.stringify({
                        type: 'ROOM_JOINED',
                        payload: { roomCode, isHost: true }
                    }));
                    newRoom.sendStateUpdate();
                    break;

                case 'JOIN_ROOM':
                    const room = rooms.get(payload.roomCode);
                    if (room) {
                        room.clients.set(ws, { id: clientId, name: payload.name || 'Guest' });
                        ws.send(JSON.stringify({
                            type: 'ROOM_JOINED',
                            payload: { roomCode: payload.roomCode, isHost: room.hostId === clientId }
                        }));
                        room.sendStateUpdate();
                    } else {
                        ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Room not found' } }));
                    }
                    break;

                case 'SELECT_TEAM':
                    // Find which room this client is in
                    for (const r of rooms.values()) {
                        if (r.clients.has(ws)) {
                            const teamCode = payload.teamCode;
                            const clientData = r.clients.get(ws);

                            if (teamCode && r.teams[teamCode] && !r.teamOwners.has(teamCode)) {
                                // Release previous
                                if (clientData.teamCode) r.teamOwners.delete(clientData.teamCode);

                                clientData.teamCode = teamCode;
                                r.teamOwners.set(teamCode, ws);
                                r.sendStateUpdate();
                            } else if (payload.spectator) {
                                if (clientData.teamCode) r.teamOwners.delete(clientData.teamCode);
                                clientData.teamCode = null;
                                r.sendStateUpdate();
                            }
                            break;
                        }
                    }
                    break;

                case 'START_AUCTION':
                    for (const r of rooms.values()) {
                        if (r.clients.has(ws)) {
                            if (r.hostId === clientId && !r.gameState.auctionActive) {
                                r.gameState.auctionActive = true;
                                r.addToAuctionLog('Auction Started!', 'text-green-500 font-bold');
                                r.pickNextPlayer();
                            }
                            break;
                        }
                    }
                    break;

                case 'PLACE_BID':
                    for (const r of rooms.values()) {
                        if (r.clients.has(ws)) {
                            if (r.gameState.currentPlayer && r.timeLeft > 0) {
                                const amount = payload.amount;
                                const clientData = r.clients.get(ws);
                                if (!clientData.teamCode) return;

                                const myTeam = r.teams[clientData.teamCode];
                                if (amount > r.gameState.currentBid && amount <= myTeam.budget) {
                                    if (r.gameState.biddingTeam === clientData.teamCode) return;
                                    r.executeBid(clientData.teamCode, amount);
                                }
                            }
                            break;
                        }
                    }
                    break;

                 case 'FAST_FORWARD':
                    for (const r of rooms.values()) {
                        if (r.clients.has(ws)) {
                            if (r.gameState.auctionActive && r.gameState.currentPlayer) {
                                // Simple skip for now
                                if (!r.gameState.biddingTeam) {
                                    r.addToAuctionLog(`Skipped: ${r.gameState.currentPlayer.name} UNSOLD`, 'text-red-400');
                                    r.broadcast('UNSOLD_PLAYER', { player: r.gameState.currentPlayer });
                                    r.sendStateUpdate();
                                    setTimeout(() => {
                                        r.gameState.currentRound++;
                                        r.pickNextPlayer();
                                    }, 1000);
                                }
                            }
                            break;
                        }
                    }
                    break;
            }
        } catch (e) {
            console.error(e);
        }
    });

    ws.on('close', () => {
        // Find room and cleanup
        for (const [code, r] of rooms.entries()) {
            if (r.clients.has(ws)) {
                const clientData = r.clients.get(ws);
                if (clientData.teamCode) {
                    r.teamOwners.delete(clientData.teamCode);
                }
                r.clients.delete(ws);
                if (r.clients.size === 0) {
                    rooms.delete(code); // Delete empty room
                } else {
                    r.sendStateUpdate();
                }
                break;
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
