const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const rooms = {}; // { ROOMCODE: { players: [ { ws, id, name } ] } }

function generateRoomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function broadcastToRoom(roomCode, data) {
    if (!rooms[roomCode]) return;
    rooms[roomCode].players.forEach(player => {
        if (player.ws.readyState === WebSocket.OPEN) {
            player.ws.send(JSON.stringify(data));
        }
    });
}

function getPlayerList(roomCode) {
    if (!rooms[roomCode]) return [];
    return rooms[roomCode].players.map(p => ({ id: p.id, name: p.name }));
}

wss.on('connection', (ws) => {
    ws.id = Math.random().toString(36).substr(2, 9);
    ws.roomCode = null;
    ws.playerName = null;

    ws.on('message', (msg) => {
        let message;
        try { message = JSON.parse(msg); } catch { return; }

        // CREATE ROOM
        if (message.type === 'create_room') {
            let roomCode;
            do { roomCode = generateRoomCode(); } while (rooms[roomCode]);
            rooms[roomCode] = { players: [] };
            ws.roomCode = roomCode;
            ws.playerName = message.name || 'Host';
            rooms[roomCode].players.push({ ws, id: ws.id, name: ws.playerName });
            ws.send(JSON.stringify({ type: 'room_created', roomCode }));
            broadcastToRoom(roomCode, { type: 'player_list', players: getPlayerList(roomCode) });
            console.log('Room created:', roomCode);
        }

        // JOIN ROOM
        else if (message.type === 'join_room') {
            const roomCode = String(message.roomCode || '').toUpperCase();
            if (!rooms[roomCode]) {
                ws.send(JSON.stringify({ type: 'error', error: 'Room not found' }));
                return;
            }
            ws.roomCode = roomCode;
            ws.playerName = message.name || 'Player';
            rooms[roomCode].players.push({ ws, id: ws.id, name: ws.playerName });
            ws.send(JSON.stringify({ type: 'room_joined', roomCode }));
            broadcastToRoom(roomCode, { type: 'player_list', players: getPlayerList(roomCode) });
            console.log('Player joined:', roomCode, 'Players:', getPlayerList(roomCode).length);
        }

        // BROADCAST CHAT OR GAME EVENTS
        else if (message.type === 'broadcast') {
            const roomCode = ws.roomCode;
            if (!roomCode || !rooms[roomCode]) return;
            broadcastToRoom(roomCode, {
                type: 'broadcast',
                from: ws.playerName || 'Player',
                data: message.data
            });
        }
    });

    ws.on('close', () => {
        const roomCode = ws.roomCode;
        if (roomCode && rooms[roomCode]) {
            rooms[roomCode].players = rooms[roomCode].players.filter(p => p.ws !== ws);
            if (rooms[roomCode].players.length === 0) {
                delete rooms[roomCode];
                console.log('Room deleted:', roomCode);
            } else {
                broadcastToRoom(roomCode, { type: 'player_list', players: getPlayerList(roomCode) });
            }
        }
    });
});

console.log('WebSocket server started on ws://localhost:8080');