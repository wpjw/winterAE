import { fetchMonsters } from '../api/open5e';

export interface Monster {
    id: string;
    name: string;
    challenge_rating: string;
    hit_points: number;
    type: string;
    armor_class: number;
}

export const createEncounter = async (monsterIds: string[]): Promise<{ encounter: Monster[]; totalChallengeRating: number }> => {
    const monsters = await Promise.all(monsterIds.map(monsterId => fetchMonsters(monsterId)));
    return {
        encounter: monsters,
        totalChallengeRating: calculateTotalChallengeRating(monsters),
    };
};

export const getEncounterDetails = (encounter: Monster[]) => {
    return encounter.map(monster => ({
        name: monster.name,
        challengeRating: monster.challenge_rating,
        hitPoints: monster.hit_points,
    }));
};

const calculateTotalChallengeRating = (monsters: Monster[]) => {
    return monsters.reduce((total, monster) => total + parseFloat(monster.challenge_rating), 0);
};