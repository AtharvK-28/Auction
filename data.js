    // IPL Team Data
    const teams = {
        "MI": { name: "Mumbai Indians", color: "bg-blue-500", text: "text-white", budget: 150, players: [] },
        "CSK": { name: "Chennai Super Kings", color: "bg-yellow-500", text: "text-white", budget: 150, players: [] },
        "RCB": { name: "Royal Challengers", color: "bg-red-600", text: "text-white", budget: 150, players: [] },
        "KKR": { name: "Kolkata Knight Riders", color: "bg-purple-600", text: "text-white", budget: 150, players: [] },
        "DC": { name: "Delhi Capitals", color: "bg-blue-400", text: "text-white", budget: 150, players: [] },
        "PBKS": { name: "Punjab Kings", color: "bg-red-400", text: "text-white", budget: 150, players: [] },
        "RR": { name: "Rajasthan Royals", color: "bg-pink-500", text: "text-white", budget: 150, players: [] },
        "SRH": { name: "Sunrisers Hyderabad", color: "bg-orange-500", text: "text-white", budget: 150, players: [] },
        "GT": { name: "Gujarat Titans", color: "bg-blue-300", text: "text-gray-800", budget: 150, players: [] },
        "LSG": { name: "Lucknow Super Giants", color: "bg-green-500", text: "text-white", budget: 150, players: [] }
    };
    const IDEAL_SQUAD = {
        Batter: 6,
        Wicketkeeper: 2,
        "All-rounder": 4,
        Bowler: 6
    };

    // Initialize marquee spend/counter for each team
    for (const team of Object.values(teams)) {
        team.marqueeSpend = 0;
        team.marqueeCount = 0;
    }
    const MAX_MARQUEE_SPEND = 60; // Crore
    const MAX_MARQUEE_COUNT = 5;

        // Player Data
        const players = [
            // Batsmen
            { id: 1, name: "Virat Kohli", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Virat_1.jpg" },
            { id: 2, name: "Rohit Sharma", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Rohit_1.jpg" },
            { id: 3, name: "Travis Head", role: "Batsman", country: "Australia", basePrice: 2, image: "bot_images/Travis_1.jpg" },
            { id: 4, name: "David Warner", role: "Batsman", country: "Australia", basePrice: 2, image: "bot_images/David_1.jpg" },
            { id: 5, name: "Shreyas Iyer", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Shreyas_1.jpg" },
            { id: 6, name: "Surya Kumar Yadav", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Surya_1.jpg" },
            { id: 7, name: "Shubman Gill", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Shubman_1.jpg" },
            { id: 8, name: "Faf Du Plessis", role: "Batsman", country: "South Africa", basePrice: 2, image: "bot_images/Faf_1.jpg" },
            { id: 9, name: "Yashasvi Jaiswal", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Yashasvi_1.jpg" },
            { id: 10, name: "Ruturaj Gaikwad", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Ruturaj_1.jpg" },

            // All-rounders
            { id: 11, name: "Hardik Pandya", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Hardik_1.jpg" },
            { id: 12, name: "Ravindra Jadeja", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Ravindra_1.jpg" },
            { id: 13, name: "Glenn Maxwell", role: "All-rounder", country: "Australia", basePrice: 2, image: "bot_images/Glenn_1_1.jpg" },
            { id: 14, name: "Ben Stokes", role: "All-rounder", country: "England", basePrice: 2, image: "bot_images/Ben_1.jpg" },
            { id: 15, name: "Shakib Al Hasan", role: "All-rounder", country: "Bangladesh", basePrice: 2, image: "bot_images/Shakib_1.jpg" },
            { id: 16, name: "Andre Russell", role: "All-rounder", country: "West Indies", basePrice: 2, image: "bot_images/Andre_1.jpg" },
            { id: 17, name: "Sunil Narine", role: "All-rounder", country: "West Indies", basePrice: 2, image: "bot_images/Sunil_1.jpg" },
            { id: 18, name: "Liam Livingstone", role: "All-rounder", country: "England", basePrice: 2, image: "bot_images/Liam_1.jpg" },
            { id: 19, name: "Axar Patel", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Axar_1.jpg" },
            { id: 20, name: "Ravichandran Ashwin", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Ravichandran_1.jpg" },

            // Bowlers
            { id: 21, name: "Jasprit Bumrah", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Jasprit_1.jpg" },
            { id: 22, name: "Rashid Khan", role: "Bowler", country: "Afghanistan", basePrice: 2, image: "bot_images/Rashid_1.jpg" },
            { id: 23, name: "Pat Cummins", role: "Bowler", country: "Australia", basePrice: 2, image: "bot_images/Pat_1.jpg" },
            { id: 24, name: "Mohammed Shami", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Mohammed_1.jpg" },
            { id: 25, name: "Trent Boult", role: "Bowler", country: "New Zealand", basePrice: 2, image: "bot_images/Trent_1.jpg" },
            { id: 26, name: "Kagiso Rabada", role: "Bowler", country: "South Africa", basePrice: 2, image: "bot_images/Kagiso_1.jpg" },
            { id: 27, name: "Arshdeep Singh", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Arshdeep_1.jpg" },
            { id: 28, name: "Mitchell Starc", role: "Bowler", country: "Australia", basePrice: 2, image: "bot_images/Mitchell_1.jpg" },
            { id: 29, name: "Yuzvendra Chahal", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Yuzvendra_1.jpg" },
            { id: 30, name: "Kuldeep Yadav", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Kuldeep_Yadav.jpg" },
            { id: 31, name: "Bhuvneshwar Kumar", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Bhuvneshwar_1.jpg" },
            { id: 32, name: "Jofra Archer", role: "Bowler", country: "England", basePrice: 2, image: "bot_images/Jofra_1.jpg" },

            // Wicketkeepers
            { id: 33, name: "MS Dhoni", role: "Wicketkeeper", country: "India", basePrice: 2, image: "bot_images/MS_1.jpg" },
            { id: 34, name: "Rishabh Pant", role: "Wicketkeeper", country: "India", basePrice: 2, image: "bot_images/Rishabh_1.jpg" },
            { id: 35, name: "Quinton De Kock", role: "Wicketkeeper", country: "South Africa", basePrice: 2, image: "bot_images/Quinton_1.jpg" },
            { id: 36, name: "Sanju Samson", role: "Wicketkeeper", country: "India", basePrice: 2, image: "bot_images/Sanju_1.jpg" },
            { id: 37, name: "Jos Buttler", role: "Wicketkeeper", country: "England", basePrice: 2, image: "bot_images/Jos_1.jpg" },
            { id: 38, name: "KL Rahul", role: "Wicketkeeper", country: "India", basePrice: 2, image: "bot_images/KL_1.jpg" },
            { id: 39, name: "Heinrich Klaasen", role: "Wicketkeeper", country: "South Africa", basePrice: 2, image: "bot_images/Heinrich_1.jpg" },
            { id: 40, name: "Nicholas Pooran", role: "Wicketkeeper", country: "West Indies", basePrice: 2, image: "bot_images/Nicholas_1.jpg" },

            // ...existing code...
// Add after your current players array

// 2 crore base price batters (capped)
            { id: 41, name: "Harry Brook", role: "Batsman", country: "England", basePrice: 2, image: "bot_images/Harry_1.jpg" },
            { id: 42, name: "Devon Conway", role: "Batsman", country: "New Zealand", basePrice: 2, image: "bot_images/Devon_1.jpg" },
            { id: 43, name: "Jake Fraser-McGurk", role: "Batsman", country: "Australia", basePrice: 2, image: "bot_images/Jake_1.jpg" },
            { id: 44, name: "Devdutt Padikkal", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Devdutt_1.jpg" },
            { id: 45, name: "Aiden Markram", role: "Batsman", country: "South Africa", basePrice: 2, image: "bot_images/Aiden_1.jpg" },
            { id: 46, name: "David Warner", role: "Batsman", country: "Australia", basePrice: 2, image: "bot_images/David_1.jpg" },
            { id: 47, name: "Kane Williamson", role: "Batsman", country: "New Zealand", basePrice: 2, image: "bot_images/Kane_1.jpg" },
            { id: 48, name: "Finn Allen", role: "Batsman", country: "New Zealand", basePrice: 2, image: "bot_images/Finn_1.jpg" },
            { id: 49, name: "Ben Duckett", role: "Batsman", country: "England", basePrice: 2, image: "bot_images/Ben_1.jpg" },
            { id: 50, name: "James Vince", role: "Batsman", country: "England", basePrice: 2, image: "bot_images/James_1.jpg" },
            { id: 51, name: "Rinku Singh", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Rinku_1.jpg" },
            { id: 52, name: "Rajat Patidar", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Rajat_1.jpg" },
            { id: 53, name: "Tim David", role: "Batsman", country: "Australia", basePrice: 2, image: "bot_images/Tim_1.jpg" },
            { id: 54, name: "Rachin Ravindra", role: "Batsman", country: "New Zealand", basePrice: 2, image: "bot_images/Rachin_1.jpg" },
            { id: 55, name: "Sai Sudharsan", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Sai_1.jpg" },
            { id: 56, name: "Tilak Verma", role: "Batsman", country: "India", basePrice: 2, image: "bot_images/Tilak_1.jpg" },
            { id: 57, name: "Shimron Hetmyer", role: "Batsman", country: "West Indies", basePrice: 2, image: "bot_images/Shimron_1.jpg" },
            { id: 58, name: "Will Young", role: "Batsman", country: "New Zealand", basePrice: 2, image: "bot_images/Will_1.jpg" },
            { id: 59, name: "Steve Smith", role: "Batsman", country: "Australia", basePrice: 2, image: "bot_images/Steve_1.jpg" },

            // 1.5 crore base price batters (capped)
            { id: 60, name: "David Miller", role: "Batsman", country: "South Africa", basePrice: 1.5, image: "bot_images/David_1.jpg" },
            { id: 61, name: "Rovman Powell", role: "Batsman", country: "West Indies", basePrice: 1.5, image: "bot_images/Rovman_1.jpg" },
            { id: 62, name: "Ajinkya Rahane", role: "Batsman", country: "India", basePrice: 1.5, image: "bot_images/Ajinkya_1.jpg" },
            { id: 63, name: "Rassie Van Der Dussen", role: "Batsman", country: "South Africa", basePrice: 1.5, image: "bot_images/Rassie_1.jpg" },
            { id: 64, name: "Sherfane Rutherford", role: "Batsman", country: "West Indies", basePrice: 1.5, image: "bot_images/Sherfane_1.jpg" },
            { id: 65, name: "Nitish Rana", role: "Batsman", country: "India", basePrice: 1.5, image: "bot_images/Nitish_1.jpg" },
            { id: 66, name: "Reeza Hendricks", role: "Batsman", country: "South Africa", basePrice: 1.5, image: "bot_images/Reeza_1.jpg" },
            // uncapped 1.5 crore
            { id: 67, name: "Shashank Singh", role: "Batsman", country: "India", basePrice: 1.5, image: "bot_images/Shashank_1.jpg" },
            // capped 1.25 crore
            { id: 68, name: "Daryl Mitchell", role: "Batsman", country: "New Zealand", basePrice: 1.25, image: "bot_images/Daryl_1.jpg" },

            // 1 crore base price batters (capped)
            { id: 69, name: "Karun Nair", role: "Batsman", country: "India", basePrice: 1, image: "bot_images/Karun_1.jpg" },
            { id: 70, name: "Mayank Agarwal", role: "Batsman", country: "India", basePrice: 1, image: "bot_images/Mayank_1.jpg" },
            { id: 71, name: "Rilee Rossouw", role: "Batsman", country: "South Africa", basePrice: 1, image: "bot_images/Rilee_1.jpg" },
            { id: 72, name: "Ashton Turner", role: "Batsman", country: "Australia", basePrice: 1, image: "bot_images/Ashton_1.jpg" },
            { id: 73, name: "Prabhsimran Singh", role: "Batsman", country: "India", basePrice: 1, image: "bot_images/Prabhsimran_1.jpg" },
            { id: 74, name: "Deepak Hooda", role: "Batsman", country: "India", basePrice: 1, image: "bot_images/Deepak_1.jpg" },
            { id: 75, name: "Mark Chapman", role: "Batsman", country: "New Zealand", basePrice: 1, image: "bot_images/Mark_1.jpg" },
            { id: 76, name: "Matthew Breetzke", role: "Batsman", country: "South Africa", basePrice: 1, image: "bot_images/Matthew_1.jpg" },
            // uncapped 1 crore
            { id: 77, name: "Abdul Samad", role: "Batsman", country: "India", basePrice: 1, image: "bot_images/Abdul_1.jpg" },
            { id: 78, name: "Bevon Jacobs", role: "Batsman", country: "New Zealand", basePrice: 1, image: "bot_images/Bevon_1.jpg" },

            // capped 0.75 crore
            { id: 79, name: "Rahul Tripathi", role: "Batsman", country: "India", basePrice: 0.75, image: "bot_images/Rahul_1.jpg" },
            { id: 80, name: "Prithvi Shaw", role: "Batsman", country: "India", basePrice: 0.75, image: "bot_images/Prithvi_1.jpg" },
            { id: 81, name: "Manish Pandey", role: "Batsman", country: "India", basePrice: 0.75, image: "bot_images/Manish_1.jpg" },
            // uncapped 0.75 crore
            { id: 82, name: "Angkrish Raghuvanshi", role: "Batsman", country: "India", basePrice: 0.75, image: "bot_images/Angkrish_1.jpg" },
            { id: 83, name: "Shubham Dubey", role: "Batsman", country: "India", basePrice: 0.75, image: "bot_images/Shubham_1.jpg" },
            { id: 84, name: "Ramandeep Singh", role: "Batsman", country: "India", basePrice: 0.75, image: "bot_images/Ramandeep_1.jpg" },

            // capped 0.5 crore
            { id: 85, name: "Tim Seifert", role: "Batsman", country: "New Zealand", basePrice: 0.5, image: "bot_images/Tim_1_1.jpg" },
            { id: 86, name: "Bhanuka Rajapaksha", role: "Batsman", country: "Sri Lanka", basePrice: 0.5, image: "bot_images/Bhanuka_1.jpg" },
            { id: 87, name: "Harry Tactor", role: "Batsman", country: "Ireland", basePrice: 0.5, image: "bot_images/Harry_1_1.jpg" },
            // uncapped 0.5 crore
            { id: 88, name: "Shah Rukh Khan", role: "Batsman", country: "India", basePrice: 0.5, image: "bot_images/Shah_1.jpg" },
            // uncapped 0.3 crore
            { id: 89, name: "Sachin Baby", role: "Batsman", country: "India", basePrice: 0.3, image: "bot_images/Sachin_1.jpg" },

            // --- Wicketkeepers ---
            { id: 90, name: "Quinton De Kock", role: "Wicketkeeper", country: "South Africa", basePrice: 2, image: "bot_images/Quinton_1.jpg" },
            { id: 91, name: "Josh Inglis", role: "Wicketkeeper", country: "Australia", basePrice: 2, image: "bot_images/Josh_1.jpg" },
            { id: 92, name: "Ryan Rickelton", role: "Wicketkeeper", country: "South Africa", basePrice: 2, image: "bot_images/Ryan_1.jpg" },
            { id: 93, name: "Phil Salt", role: "Wicketkeeper", country: "England", basePrice: 2, image: "bot_images/Phil_1.jpg" },

            { id: 94, name: "Rahmanullah Gurbaz", role: "Wicketkeeper", country: "Afghanistan", basePrice: 1.25, image: "bot_images/Rahmanullah_1.jpg" },
            { id: 95, name: "Ishan Kishan", role: "Wicketkeeper", country: "India", basePrice: 1.25, image: "bot_images/Ishan_1.jpg" },

            { id: 96, name: "Alex Carey", role: "Wicketkeeper", country: "Australia", basePrice: 1, image: "bot_images/Alex_1.jpg" },
            { id: 97, name: "Tom Banton", role: "Wicketkeeper", country: "England", basePrice: 1, image: "bot_images/Tom_1.jpg" },
            { id: 98, name: "Sam Billings", role: "Wicketkeeper", country: "England", basePrice: 1, image: "bot_images/Sam_1.jpg" },
            { id: 99, name: "Jitesh Sharma", role: "Wicketkeeper", country: "India", basePrice: 1, image: "bot_images/Jitesh_1.jpg" },

            { id: 100, name: "Dhruv Jurel", role: "Wicketkeeper", country: "India", basePrice: 0.75, image: "bot_images/Dhruv_1.jpg" },
            { id: 101, name: "KS Bharat", role: "Wicketkeeper", country: "India", basePrice: 0.75, image: "bot_images/KS_1.jpg" },
            { id: 102, name: "Anuj Rawat", role: "Wicketkeeper", country: "India", basePrice: 0.75, image: "bot_images/Anuj_1.jpg" },

            { id: 103, name: "Abhishek Porel", role: "Wicketkeeper", country: "India", basePrice: 0.5, image: "bot_images/Abhishek_1.jpg" },

            { id: 104, name: "Kumar Kushagra", role: "Wicketkeeper", country: "India", basePrice: 0.3, image: "bot_images/Kumar_1.jpg" },
            { id: 105, name: "Vishnu Vinod", role: "Wicketkeeper", country: "India", basePrice: 0.3, image: "bot_images/Vishnu_1.jpg" },
            { id: 106, name: "Harvik Desai", role: "Wicketkeeper", country: "India", basePrice: 0.3, image: "bot_images/Harvik_1.jpg" },
            { id: 107, name: "Saurav Chauhan", role: "Wicketkeeper", country: "India", basePrice: 0.3, image: "bot_images/Saurav_1.jpg" },
            { id: 108, name: "Robin Minz", role: "Wicketkeeper", country: "India", basePrice: 0.3, image: "bot_images/Robin_1.jpg" },
            { id: 109, name: "Vansh Bedi", role: "Wicketkeeper", country: "India", basePrice: 0.3, image: "bot_images/Vansh_1.jpg" },

// --- All-rounders ---
            { id: 110, name: "Sam Curran", role: "All-rounder", country: "England", basePrice: 2, image: "bot_images/Sam_1_1.jpg" },
            { id: 111, name: "Cameron Green", role: "All-rounder", country: "Australia", basePrice: 2, image: "bot_images/Cameron_1.avif" },
            { id: 112, name: "Marcus Stoinis", role: "All-rounder", country: "Australia", basePrice: 2, image: "bot_images/Marcus_1.jpg" },
            { id: 113, name: "Shardul Thakur", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Shardul_1.jpg" },
            { id: 114, name: "Riyan Parag", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Riyan_1.jpg" },
            { id: 115, name: "Mitchell Marsh", role: "All-rounder", country: "Australia", basePrice: 2, image: "bot_images/Mitchell_1_2.jpg" },
            { id: 116, name: "Mitchell Santner", role: "All-rounder", country: "New Zealand", basePrice: 2, image: "bot_images/Mitchell_1_1.jpg" },
            { id: 117, name: "Shivam Dube", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Shivam_1.jpg" },
            { id: 118, name: "Glenn Phillips", role: "All-rounder", country: "New Zealand", basePrice: 2, image: "bot_images/Glenn_1.jpg" },
            { id: 119, name: "Will Jacks", role: "All-rounder", country: "England", basePrice: 2, image: "bot_images/Will_1.jpg" },
            { id: 120, name: "Washington Sundar", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Washington_1.jpg" },
            { id: 121, name: "Venkatesh Iyer", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Venkatesh_1.jpg" },
            { id: 122, name: "Glenn Maxwell", role: "All-rounder", country: "Australia", basePrice: 2, image: "bot_images/Glenn_1.jpg" },
            { id: 123, name: "Krunal Pandya", role: "All-rounder", country: "India", basePrice: 2, image: "bot_images/Krunal_1.jpg" },

            { id: 124, name: "Jason Holder", role: "All-rounder", country: "West Indies", basePrice: 1.5, image: "bot_images/Jason_1_1.jpg" },
            { id: 125, name: "Daniel Sams", role: "All-rounder", country: "Australia", basePrice: 1.5, image: "bot_images/Daniel_1.jpg" },
            { id: 126, name: "James Neesham", role: "All-rounder", country: "New Zealand", basePrice: 1.5, image: "bot_images/James_1_1.jpg" },
            { id: 127, name: "Michael Bracewell", role: "All-rounder", country: "New Zealand", basePrice: 1.5, image: "bot_images/Michael_1.jpg" },
            { id: 128, name: "Kyle Mayers", role: "All-rounder", country: "West Indies", basePrice: 1.5, image: "bot_images/Kyle_1.jpg" },

            { id: 129, name: "Marco Jansen", role: "All-rounder", country: "South Africa", basePrice: 1.25, image: "bot_images/Marco_1.jpg" },
            { id: 130, name: "Moeen Ali", role: "All-rounder", country: "England", basePrice: 1.25, image: "bot_images/Moeen_1.jpg" },
            { id: 131, name: "Kamindu Mendis", role: "All-rounder", country: "Sri Lanka", basePrice: 1.25, image: "bot_images/Kamindu_1.jpg" },

            { id: 132, name: "Shahbaz Ahmed", role: "All-rounder", country: "India", basePrice: 1, image: "bot_images/Shahbaz_1.jpg" },
            { id: 133, name: "Dasun Shanaka", role: "All-rounder", country: "Sri Lanka", basePrice: 1, image: "bot_images/Dasun_1.jpg" },
            { id: 134, name: "Romario Shepherd", role: "All-rounder", country: "West Indies", basePrice: 1, image: "bot_images/Romario_1.jpg" },
            { id: 135, name: "Krishnappa Gowtham", role: "All-rounder", country: "India", basePrice: 1, image: "bot_images/Krishnappa_1.jpg" },
            { id: 136, name: "Rahul Tewatia", role: "All-rounder", country: "India", basePrice: 1, image: "bot_images/Rahul_1_1.jpg" },
            { id: 137, name: "Vijay Shankar", role: "All-rounder", country: "India", basePrice: 1, image: "bot_images/Vijay_1.jpg" },
            { id: 138, name: "Anshul Kamboj", role: "All-rounder", country: "India", basePrice: 1, image: "bot_images/Anshul_1.jpg" },

            { id: 139, name: "Mohammed Nabi", role: "All-rounder", country: "Afghanistan", basePrice: 0.75, image: "bot_images/Mohammed_1_1.jpg" },
            { id: 140, name: "Swapnil Singh", role: "All-rounder", country: "India", basePrice: 0.75, image: "bot_images/Swapnil_1.jpg" },
            { id: 141, name: "Mahipal Lomror", role: "All-rounder", country: "India", basePrice: 0.75, image: "bot_images/Mahipal_1.jpg" },

            { id: 142, name: "Sikandar Raza", role: "All-rounder", country: "Zimbabwe", basePrice: 0.5, image: "bot_images/Sikandar_1.jpg" },
            { id: 143, name: "Abhinav Manohar", role: "All-rounder", country: "India", basePrice: 0.5, image: "bot_images/Abhinav_1.jpg" },
            { id: 144, name: "Sanvir Singh", role: "All-rounder", country: "India", basePrice: 0.5, image: "bot_images/Sanvir_1.jpg" },
            { id: 145, name: "Anukul Roy", role: "All-rounder", country: "India", basePrice: 0.5, image: "bot_images/Anukul_1.jpg" },


            { id: 146, name: "Harpreet Brar", role: "All-rounder", country: "India", basePrice: 0.3, image: "bot_images/Harpreet_1.jpg" },
            { id: 147, name: "Naman Dhir", role: "All-rounder", country: "India", basePrice: 0.3, image: "bot_images/Naman_1.jpg" },
            { id: 148, name: "Raj Bawa", role: "All-rounder", country: "India", basePrice: 0.3, image: "bot_images/Raj_1.jpg" },

            // --- Bowlers ---
            { id: 149, name: "Josh Hazlewood", role: "Bowler", country: "Australia", basePrice: 2, image: "bot_images/Josh_1_1.jpg" },
            { id: 150, name: "Noor Ahmad", role: "Bowler", country: "Afghanistan", basePrice: 2, image: "bot_images/Noor_1.jpg" },
            { id: 151, name: "Wanindu Hasaranga", role: "Bowler", country: "Sri Lanka", basePrice: 2, image: "bot_images/Wanindu_1.jpg" },
            { id: 152, name: "Maheesh Theekshana", role: "Bowler", country: "Sri Lanka", basePrice: 2, image: "bot_images/Maheesh_1.jpg" },
            { id: 153, name: "Mathisha Pathirana", role: "Bowler", country: "Sri Lanka", basePrice: 2, image: "bot_images/Mathisha_1.jpg" },
            { id: 154, name: "Shamar Joseph", role: "Bowler", country: "West Indies", basePrice: 2, image: "bot_images/Shamar_1.jpg" },
            { id: 155, name: "Spencer Johnson", role: "Bowler", country: "Australia", basePrice: 2, image: "bot_images/Spencer_1.jpg" },
            { id: 156, name: "Gerald Coetzee", role: "Bowler", country: "South Africa", basePrice: 2, image: "bot_images/Gerald_1.jpg" },
            { id: 157, name: "Avesh Khan", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Avesh_1.jpg" },
            { id: 158, name: "Prasidh Krishna", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Prasidh_1.jpg" },
            { id: 159, name: "T Natarajan", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/T_1.jpg" },
            { id: 160, name: "Harshal Patel", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Harshal_1.jpg" },
            { id: 161, name: "Deepak Chahar", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Deepak_1_1.jpg" },
            { id: 162, name: "Mukesh Kumar", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Mukesh_1.jpg" },
            { id: 163, name: "Lockie Ferguson", role: "Bowler", country: "New Zealand", basePrice: 2, image: "bot_images/Lockie_1.jpg" },
            { id: 164, name: "Varun Chakravarthy", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Varun_1.jpg" },
            { id: 165, name: "Ravi Bishnoi", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Ravi_1.jpg" },
            { id: 166, name: "Mayank Yadav", role: "Bowler", country: "India", basePrice: 2, image: "bot_images/Mayank_1_2.jpg" },

            // 1.5 crore
            { id: 167, name: "Anrich Nortje", role: "Bowler", country: "South Africa", basePrice: 1.5, image: "bot_images/Anrich_1.jpg" },
            { id: 168, name: "Adam Zampa", role: "Bowler", country: "Australia", basePrice: 1.5, image: "bot_images/Adam_1.jpg" },
            { id: 169, name: "Keshav Maharaj", role: "Bowler", country: "South Africa", basePrice: 1.5, image: "bot_images/Keshav_1.jpg" },
            { id: 170, name: "Mujeeb Ur Rahman", role: "Bowler", country: "Afghanistan", basePrice: 1.5, image: "bot_images/Mujeeb_1.jpg" },
            { id: 171, name: "Adil Rashid", role: "Bowler", country: "England", basePrice: 1.5, image: "bot_images/Adil_1.jpg" },
            { id: 172, name: "Nandre Burger", role: "Bowler", country: "South Africa", basePrice: 1.5, image: "bot_images/Nandre_1.jpg" },
            { id: 173, name: "Naveen-Ul-Haq", role: "Bowler", country: "Afghanistan", basePrice: 1.5, image: "bot_images/Naveen_1.jpg" },
            { id: 174, name: "Jaydev Unadkat", role: "Bowler", country: "India", basePrice: 1.5, image: "bot_images/Jaydev_1.jpg" },
            { id: 175, name: "Akash Deep", role: "Bowler", country: "India", basePrice: 1.5, image: "bot_images/Akash_1.jpg" },
            { id: 176, name: "Shreyas Gopal", role: "Bowler", country: "India", basePrice: 1.5, image: "bot_images/Shreyas_1_1.jpg" },
            { id: 177, name: "Mayank Yadav", role: "Bowler", country: "India", basePrice: 1.5, image: "bot_images/Mayank_1.jpg" }, // duplicate, if needed
            { id: 178, name: "Suyash Sharma", role: "Bowler", country: "India", basePrice: 1.5, image: "bot_images/Suyash_1.jpg" },

            // 1.25 crore
            { id: 179, name: "Tushar Deshpande", role: "Bowler", country: "India", basePrice: 1.25, image: "bot_images/Tushar_1.jpg" },
            { id: 180, name: "Navdeep Saini", role: "Bowler", country: "India", basePrice: 1.25, image: "bot_images/Navdeep_1.jpg" },
            { id: 181, name: "Fazalhaq Farooqi", role: "Bowler", country: "Afghanistan", basePrice: 1.25, image: "bot_images/Fazalhaq_1.jpg" },
            { id: 182, name: "Khaleel Ahmed", role: "Bowler", country: "India", basePrice: 1.25, image: "bot_images/Khaleel_1.jpg" },
            { id: 183, name: "Corbin Bosch", role: "Bowler", country: "South Africa", basePrice: 1.25, image: "bot_images/Corbin_1.jpg" },
            { id: 184, name: "Lungi Ngidi", role: "Bowler", country: "South Africa", basePrice: 1.25, image: "bot_images/Lungi_1.jpg" },

            // 1 crore
            { id: 185, name: "Alzarri Joseph", role: "Bowler", country: "West Indies", basePrice: 1, image: "bot_images/Alzarri_1.jpg" },
            { id: 186, name: "Umesh Yadav", role: "Bowler", country: "India", basePrice: 1, image: "bot_images/Umesh_1.jpg" },
            { id: 187, name: "Rahul Chahar", role: "Bowler", country: "India", basePrice: 1, image: "bot_images/Rahul_1_2.jpg" },
            { id: 188, name: "Sandeep Warrier", role: "Bowler", country: "India", basePrice: 1, image: "bot_images/Sandeep_1.jpg" },
            { id: 189, name: "Umran Malik", role: "Bowler", country: "India", basePrice: 1, image: "bot_images/Umran_1.jpg" },
            { id: 190, name: "Sandeep Sharma", role: "Bowler", country: "India", basePrice: 1, image: "bot_images/Sandeep_1_1.jpg" },
            { id: 191, name: "Karn Sharma", role: "Bowler", country: "India", basePrice: 1, image: "bot_images/Karn_1.jpg" },

            // 0.75 crore
            { id: 192, name: "Chetan Sakariya", role: "Bowler", country: "India", basePrice: 0.75, image: "bot_images/Chetan_1.jpg" },
            { id: 193, name: "Sai Kishore", role: "Bowler", country: "India", basePrice: 0.75, image: "bot_images/Sai_1_1.jpg" },
            { id: 194, name: "Mayank Markande", role: "Bowler", country: "India", basePrice: 0.75, image: "bot_images/Mayank_1_1.jpg" },

            // 0.5 crore
            { id: 195, name: "Shivam Mavi", role: "Bowler", country: "India", basePrice: 0.5, image: "bot_images/Shivam_1_1.jpg" },
            { id: 196, name: "Eshan Malinga", role: "Bowler", country: "South Africa", basePrice: 0.5, image: "bot_images/Eshan_1.jpg" },
            { id: 197, name: "Kumar Kartikeya", role: "Bowler", country: "India", basePrice: 0.5, image: "bot_images/Kumar_1.jpg" },
            { id: 198, name: "Rasikh Salam", role: "Bowler", country: "India", basePrice: 0.5, image: "bot_images/Rasikh_1.jpg" },

            // 0.3 crore
            { id: 199, name: "Murugan Ashwin", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Murugan_1.jpg" },
            { id: 200, name: "Madhav Suthar", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Madhav_1.jpg" },

            { id: 201, name: "Nehal Wadhera", role: "Batter", country: "India", basePrice: 0.5, image: "bot_images/Nehal_1.jpg" },
            { id: 202, name: "Sameer Rizvi", role: "Batter", country: "India", basePrice: 0.5, image: "bot_images/Sameer_1.jpg" },
            { id: 203, name: "Swastik Chhikara", role: "Batter", country: "India", basePrice: 0.3, image: "bot_images/Swastik_1.jpg" },
            { id: 204, name: "Aniket Verma", role: "Batter", country: "India", basePrice: 0.3, image: "bot_images/Aniket_1.jpg" },
            { id: 205, name: "Priyansh Arya", role: "Batter", country: "India", basePrice: 0.3, image: "bot_images/Priyansh_1.jpg" },
            { id: 206, name: "Priyam Garg", role: "Batter", country: "India", basePrice: 0.3, image: "bot_images/Priyam_1.jpg" },

            // --- 0.3 crore Bowlers (Uncapped) ---
            { id: 207, name: "Vidwath Kaverappa", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Vidwath_1.jpg" },
            { id: 208, name: "Yash Thakur", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Yash_1.jpg" },
            { id: 209, name: "Vyshak Vijay Kumar", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Vyshak_1.jpg" },
            { id: 210, name: "Pravin Dubey", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Pravin_1.jpg" },
            { id: 211, name: "Simranjeet Singh", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Simranjeet_1.jpg" },
            { id: 212, name: "Zeeshan Ansari", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Zeeshan_1.jpg" },
            { id: 213, name: "Harnoor Brar", role: "Bowler", country: "India", basePrice: 0.3, image: "bot_images/Harnoor_1.jpg" },

            // --- 0.3 crore Wicketkeeper (Uncapped) ---
            { id: 214, name: "Aravelly Avanish", role: "Wicketkeeper", country: "India", basePrice: 0.3, image: "bot_images/Aravelly_1.jpg" },

            // --- 0.5 crore All-rounder (Uncapped) ---
            { id: 215, name: "Musheer Khan", role: "All-rounder", country: "India", basePrice: 0.5, image: "bot_images/Musheer_1.jpg" },

            // --- 0.3 crore All-rounders (Uncapped) ---
            { id: 216, name: "Shivam Singh", role: "All-rounder", country: "India", basePrice: 0.3, image: "bot_images/Shivam_1.jpg" },
            { id: 217, name: "Vivrant Sharma", role: "All-rounder", country: "India", basePrice: 0.3, image: "bot_images/Vivrant_1.jpg" },


];



        // Game State
const marqueeNames = [
    "Virat Kohli", "Rohit Sharma", "Jasprit Bumrah", "Surya Kumar Yadav", "Hardik Pandya",
    "MS Dhoni", "Jos Buttler", "Shreyas Iyer", "Rishabh Pant", "KL Rahul",
    "Kagiso Rabada", "Arshdeep Singh", "Mitchell Starc", "Yuzvendra Chahal", "Rashid Khan",
    "Pat Cummins", "Heinrich Klaasen", "Travis Head", "Andre Russell", "Sunil Narine",
    "Kuldeep Yadav", "Liam Livingstone", "Sanju Samson", "Yashasvi Jaiswal", "Bhuvneshwar Kumar",
    "Ruturaj Gaikwad", "Shubman Gill", "Ravindra Jadeja", "Axar Patel", "Ravichandran Ashwin",
    "Faf Du Plessis", "Trent Boult", "Nicholas Pooran", "Mohammed Shami", "Jofra Archer"
];
const battersNames = [
    "Harry Brook","Devon Conway","Jake Fraser-McGurk","Devdutt Padikkal","Aiden Markram","David Warner","Kane Williamson","Finn Allen","Ben Duckett","James Vince","Rinku Singh","Rajat Patidar","Tim David","Rachin Ravindra","Sai Sudharsan","Tilak Verma","Shimron Hetmyer","Will Young","Steve Smith",
    "David Miller","Rovman Powell","Ajinkya Rahane","Rassie Van Der Dussen","Sherfane Rutherford","Nitish Rana","Reeza Hendricks","Shashank Singh","Daryl Mitchell","Karun Nair","Mayank Agarwal","Rilee Rossouw","Ashton Turner","Prabhsimran Singh","Deepak Hooda","Mark Chapman","Matthew Breetzke","Abdul Samad","Bevon Jacobs",
    "Rahul Tripathi","Prithvi Shaw","Manish Pandey","Angkrish Raghuvanshi","Shubham Dubey","Ramandeep Singh","Tim Seifert","Bhanuka Rajapaksha","Harry Tector","Shah Rukh Khan","Sachin Baby","Nehal Wadhera","Sameer Rizvi","Swastik Chhikara","Aniket Verma","Priyansh Arya","Priyam Garg"
];

const wktNames = [
    "Quinton De Kock","Josh Inglis","Ryan Rickelton","Phil Salt",
    "Rahmanullah Gurbaz","Ishan Kishan",
    "Alex Carey","Tom Banton","Sam Billings","Jitesh Sharma",
    "Dhruv Jurel","KS Bharat","Anuj Rawat",
    "Abhishek Porel","Aravelly Avanish",
    "Kumar Kushagra","Vishnu Vinod","Harvik Desai","Saurav Chauhan","Robin Minz","Vansh Bedi"
];

const allrounderNames = [
    "Sam Curran","Cameron Green","Marcus Stoinis","Shardul Thakur","Riyan Parag","Mitchell Marsh","Mitchell Santner","Shivam Dube","Glenn Phillips","Will Jacks","Washington Sundar","Venkatesh Iyer","Glenn Maxwell","Krunal Pandya",
    "Jason Holder","Daniel Sams","James Neesham","Michael Bracewell","Kyle Mayers",
    "Marco Jansen","Moeen Ali","Kamindu Mendis",
    "Shahbaz Ahmed","Dasun Shanaka","Romario Shepherd","Krishnappa Gowtham","Rahul Tewatia","Vijay Shankar","Anshul Kamboj",
    "Mohammed Nabi","Swapnil Singh","Mahipal Lomror",
    "Sikandar Raza","Abhinav Manohar","Sanvir Singh","Anukul Roy",
    "Harpreet Brar","Naman Dhir","Raj Bawa","Musheer Khan","Shivam Singh","Vivrant Sharma"
];

const bowlersNames = [
    "Josh Hazlewood","Noor Ahmad","Wanindu Hasaranga","Corbin Bosch","Maheesh Theekshana","Mathisha Pathirana","Shamar Joseph","Spencer Johnson","Gerald Coetzee","Avesh Khan","Prasidh Krishna","T Natarajan","Harshal Patel","Deepak Chahar","Mukesh Kumar","Lockie Ferguson","Varun Chakravarthy","Ravi Bishnoi","Mayank Yadav",
    "Anrich Nortje","Adam Zampa","Keshav Maharaj","Mujeeb Ur Rahman","Adil Rashid","Nandre Burger","Naveen-Ul-Haq","Jaydev Unadkat","Akash Deep","Shreyas Gopal","Suyash Sharma",
    "Tushar Deshpande","Navdeep Saini","Fazalhaq Farooqi","Khaleel Ahmed","Lungi Ngidi",
    "Alzarri Joseph","Umesh Yadav","Rahul Chahar","Sandeep Warrier","Umran Malik","Sandeep Sharma","Karn Sharma",
    "Chetan Sakariya","Sai Kishore","Mayank Markande",
    "Shivam Mavi","Eshan Malinga","Kumar Kartikeya","Rasikh Salam",
    "Murugan Ashwin","Madhav Suthar","Vidwath Kaverappa","Yash Thakur","Vyshak Vijay Kumar","Pravin Dubey","Simranjeet Singh","Zeeshan Ansari","Harnoor Brar"
];

const playerRatings = {
    "Virat Kohli": 100.1, "Rohit Sharma": 99.5, "Jasprit Bumrah": 98.9, "Surya Kumar Yadav": 97, "Hardik Pandya": 99.9,
    "MS Dhoni": 95.5, "Jos Buttler": 98.7, "Shreyas Iyer": 99.1, "Rishabh Pant": 96.6, "KL Rahul": 98.7,
    "Kagiso Rabada": 96.4, "Arshdeep Singh": 97.3, "Mitchell Starc": 97.7, "Yuzvendra Chahal": 95.4, "Rashid Khan": 96.4,
    "Pat Cummins": 96.2, "Heinrich Klaasen": 98.6, "Travis Head": 97.7, "Andre Russell": 97.1, "Sunil Narine": 97.5,
    "Kuldeep Yadav": 96.1, "Liam Livingstone": 93.8, "Sanju Samson": 97.7, "Yashasvi Jaiswal": 97.7, "Bhuvneshwar Kumar": 93.7,
    "Ruturaj Gaikwad": 93.5, "Shubman Gill": 95.8, "Ravindra Jadeja": 92.5, "Axar Patel": 98.8, "Ravichandran Ashwin": 95.8,
    "Faf Du Plessis": 93.5, "Trent Boult": 95.5, "Nicholas Pooran": 98.2, "Mohammed Shami": 93.9, "Jofra Archer": 93.1,
    "David Miller": 91.8, "Harry Brook": 87, "Devon Conway": 90, "Jake Fraser-McGurk": 85, "Rahul Tripathi": 82,
    "Karun Nair": 88, "Devdutt Padikkal": 87, "Aiden Markram": 95.8, "David Warner": 91, "Mayank Agarwal": 84,
    "Rovman Powell": 86, "Ajinkya Rahane": 94.5, "Prithvi Shaw": 83, "Kane Williamson": 89.1, "Finn Allen": 84,
    "Dewald Brevis": 85, "Ben Duckett": 86, "Manish Pandey": 85, "Rilee Rossouw": 87, "Rassie Van Der Dussen": 88,
    "Sherfane Rutherford": 90, "Ashton Turner": 81, "James Vince": 88, "Sachin Baby": 78, "Rinku Singh": 90,
    "Prabhsimran Singh": 89, "Rajat Patidar": 94.6, "Abdul Samad": 88, "Nitish Kumar Reddy": 90, "Will Jacks": 91,
    "Tim David": 90, "Rachin Ravindra": 88, "Tristian Stubbs": 90, "Sai Sudarshan": 92, "Ramandeep Singh": 87,
    "Tilak Verma": 90, "Shashank Singh": 89, "Shimron Hetmyer": 86, "Nitish Rana": 88, "Daryl Mitchell": 87,
    "Jason Roy": 86, "Will Young": 85, "Tim Seifert": 84, "Bhanuka Rajapaksha": 84, "Mark Chapman": 87,
    "Steve Smith": 88, "Reeza Hendricks": 86, "Harry Tector": 85, "Deepak Hooda": 76, "Shah Rukh Khan": 84,
    "Angkrish Raghuvanshi": 84, "Matthew Breetzke": 88, "Bevon Jacobs": 87, "Corbin Bosch": 83, "Shubham Dubey": 86,
    "Abhishek Porel": 80, "Kumar Kushagra": 71, "Anuj Rawat": 73, "Quinton De Kock": 87, "Rahmanullah Gurbaz": 85,
    "Ryan Rickelton": 87, "Josh Inglis": 85, "Vishnu Vinod": 72, "Dhruv Jurel": 83, "Phil Salt": 94.9,
    "Jitesh Sharma": 87, "Ishan Kishan": 87, "Alex Carey": 90, "Tom Banton": 80, "Sam Billings": 82, "KS Bharat": 75,
    "Harvik Desai": 70, "Saurav Chauhan": 71, "Robin Minz": 75, "Vansh Bedi": 73, "Sam Curran": 91.2,
    "Marco Jansen": 95.8, "Cameron Green": 94.7, "Marcus Stoinis": 93.7, "Mohammed Nabi": 86, "Sikandar Raza": 91.9,
    "Mitchell Santner": 94.9, "Jason Holder": 89, "Daniel Sams": 86, "James Neesham": 85, "Michael Bracewell": 88,
    "Kyle Mayers": 89, "Romario Shepherd": 89, "Daniel Lawrence": 85, "Shivam Dube": 94.3, "Glenn Phillips": 95.8,
    "Rahul Tewatiya": 86, "Washington Sundar": 89, "Venkatesh Iyer": 94.3, "Anukul Roy": 79, "Raj Bawa": 77,
    "Glenn Maxwell": 89, "Krunal Pandya": 94.5, "Kamindu Mendis": 88, "Abhinav Manohar": 78, "Shahbaz Ahmed": 85,
    "Dasun Shanaka": 88.7, "Shardul Thakur": 94.7, "Harpreet Brar": 84, "Naman Dhir": 80, "Vijay Shankar": 85,
    "Anshul Kamboj": 82, "Swapnil Singh": 81, "Sanvir Singh": 77, "Krishnappa Gowtham": 83, "Riyan Parag": 89,
    "Mitchell Marsh": 95.8, "Mahipal Lomror": 81, "Moeen Ali": 87, "Josh Hazlewood": 95.9, "Anrich Nortje": 89,
    "Noor Ahmad": 96.6, "Wanindu Hasaranga": 90, "Maheesh Theekshana": 89, "Adam Zampa": 88, "Mathisha Pathirana": 89,
    "Akeal Hosein": 83, "Keshav Maharaj": 88, "Alzarri Joseph": 87, "Shamar Joseph": 85, "Mujeeb Ur Rahman": 88,
    "Adil Rashid": 86, "Nandre Burger": 85, "Spencer Johnson": 85, "Naveen-Ul-Haq": 86, "Gerald Coetzee": 86,
    "Jaydev Unadkat": 87, "Umesh Yadav": 86, "Avesh Khan": 90, "Prasidh Krishna": 90, "T Natarajan": 89,
    "Rahul Chahar": 86, "Harshal Patel": 89, "Deepak Chahar": 90, "Akash Deep": 89, "Mukesh Kumar": 89,
    "Tushar Deshpande": 87, "Lockie Ferguson": 88, "Shivam Mavi": 86, "Navdeep Saini": 84, "Chetan Sakariya": 85,
    "Sandeep Warrier": 82, "Fazalhaq Farooqi": 86, "Kuldeep Sen": 85, "Reece Topley": 88, "Murugan Ashwin": 83,
    "Mayank Markande": 85, "Shreyas Gopal": 84, "Suyash Sharma": 88, "Karn Sharma": 86, "Kumar Kartikeya": 82,
    "Madhav Suthar": 77, "Lungi Ngidi": 87, "Rasikh Salam": 84, "Varun Chakravarthy": 95.7, "Umran Malik": 80,
    "Ravi Bishnoi": 94.7, "Khaleel Ahmed": 89, "Mayank Yadav": 83, "Harshit Rana": 90, "Eshan Malinga": 83,
    "Sandeep Sharma": 88, "Sai Kishore": 89, "Nehal Wadhera": 84, "Swastik Chhikara": 73, "Aravelly Avanish": 72,
    "Shivam Singh": 70, "Vivrant Sharma": 73, "Vidwath Kaverappa": 71, "Yash Thakur": 80, "Vyshak Vijay Kumar": 77,
    "Priyansh Arya": 84, "Pravin Dubey": 72, "Simranjeet Singh": 76, "Aniket Verma": 74, "Zeeshan Ansari": 75,
    "Priyam Garg": 74, "Harnoor Brar": 71, "Sameer Rizvi": 77, "Musheer Khan": 80
};

const uncappedPlayers = new Set([
    "MS Dhoni","Sachin Baby","Prabhsimran Singh","Abdul Samad","Ramandeep Singh","Shashank Singh","Shah Rukh Khan","Angkrish Raghuvanshi","Bevon Jacobs","Shubham Dubey","Abhishek Porel","Kumar Kushagra","Anuj Rawat","Vishnu Vinod","Harvik Desai","Saurav Chauhan","Robin Minz","Vansh Bedi","Rahul Tewatia","Anukul Roy","Raj Bawa","Abhinav Manohar","Harpreet Brar","Naman Dhir","Anshul Kamboj","Swapnil Singh","Sanvir Singh","Murugan Ashwin","Mayank Markande","Suyash Sharma","Karn Sharma","Kumar Kartikeya","Madhav Suthar","Rasikh Salam","Nehal Wadhera","Swastik Chhikara","Aravelly Avanish","Shivam Singh","Vivrant Sharma","Vidwath Kaverappa","Yash Thakur","Vyshak Vijay Kumar","Priyansh Arya","Pravin Dubey","Simranjeet Singh","Aniket Verma","Zeeshan Ansari","Priyam Garg","Harnoor Brar","Sameer Rizvi","Musheer Khan"
]);

const initialGameState = {
    currentPlayer: null,
    currentBid: 0,
    biddingTeam: null,
    auctionActive: false,
    currentRound: 1,
    availablePlayers: [...players], // players is defined above
    soldPlayers: [],
    auctionLog: []
};

module.exports = {
    teams,
    players,
    IDEAL_SQUAD,
    initialGameState,
    marqueeNames,
    battersNames,
    wktNames,
    allrounderNames,
    bowlersNames,
    playerRatings,
    uncappedPlayers
};
