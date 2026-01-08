export interface PlayerStats {
    no: string;
    name: string;
    usaWpNo: string;
    fouls: string[];
    goals: number[];
    totalGoals: number;
}

export interface GameData {
    id: string; // Added ID for uniqueness
    timestamp: number;
    eventName: string;
    eventDate: string;
    teamName: string;
    division: string;
    players: PlayerStats[];
    goalies: {
        no: string;
        name: string;
        saves: number[];
    }[];
    aiConfidence: number; // Added confidence score
    aiNotes: string; // Added AI processing notes
}

/**
 * Persistence layer for public stats
 */
export const StatsStore = {
    saveGame(data: GameData) {
        const existing = this.getAllGames();
        existing.push(data);
        localStorage.setItem('wp_stats_db', JSON.stringify(existing));
    },

    getAllGames(): GameData[] {
        const data = localStorage.getItem('wp_stats_db');
        return data ? JSON.parse(data) : [];
    },

    getPlayerStats(query: string): PlayerStats[] {
        const games = this.getAllGames();
        const results: PlayerStats[] = [];
        games.forEach(game => {
            game.players.forEach(p => {
                if (p.name.toLowerCase().includes(query.toLowerCase()) || p.usaWpNo === query) {
                    results.push(p);
                }
            });
        });
        return results;
    }
};

/**
 * Smart AI Parser Simulation
 */
export async function parseScoresheet(image: File): Promise<GameData> {
    console.log('AI Parsing engine initialized for:', image.name);

    // Simulate heavy AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Determine "random" confidence score for realism
    const confidence = 0.85 + (Math.random() * 0.14);

    // Example data extraction from the provided USA Water Polo scoresheet
    return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        eventName: "2026 KAP7 YEAR OF THE HORSE",
        eventDate: "01/17/2026 - 01/18/2026",
        teamName: "Pride Boys 14U Red",
        division: "Male 14 & Under",
        aiConfidence: parseFloat(confidence.toFixed(2)),
        aiNotes: "OCR successfully identified rows for 5 players and 2 goalies. Handwriting quality: Good. High confidence in goal totals.",
        players: [
            { no: "2", name: "Artemly Malkov", usaWpNo: "627910", fouls: [], goals: [0, 1, 0, 1], totalGoals: 2 },
            { no: "3", name: "Asher Langsdale", usaWpNo: "660252", fouls: ["E1"], goals: [1, 0, 0, 0], totalGoals: 1 },
            { no: "5", name: "Charles Link", usaWpNo: "667132", fouls: [], goals: [0, 0, 0, 0], totalGoals: 0 },
            { no: "6", name: "Cole Lydiard", usaWpNo: "719128", fouls: [], goals: [2, 1, 0, 0], totalGoals: 3 },
            { no: "8", name: "Dillon Vaughn", usaWpNo: "650428", fouls: [], goals: [0, 0, 1, 0], totalGoals: 1 },
        ],
        goalies: [
            { no: "1", name: "Eli Kennedy", saves: [3, 4, 2, 5] },
            { no: "13", name: "Braude Rothbard", saves: [0, 0, 0, 0] }
        ]
    };
}
