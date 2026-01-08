export interface PlayerStats {
    no: string;
    name: string;
    usaWpNo: string;
    fouls: string[];
    goals: number[];
    totalGoals: number;
}

export interface GameData {
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
}

/**
 * Simulates parsing of a scoresheet using OCR/LLM logic.
 * In a real production app, this would send the image to a backend
 * that uses Vision AI or a fine-tuned model to extract structured data.
 */
export async function parseScoresheet(image: File): Promise<GameData> {
    console.log('Parsing image:', image.name);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock data based on the provided sample image
    return {
        eventName: "2026 KAP7 YEAR OF THE HORSE",
        eventDate: "01/17/2026 - 01/18/2026",
        teamName: "Pride Boys 14U Red (Pride Water Polo Academy)",
        division: "Male 14 & Under",
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
