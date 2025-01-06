import { fetchMonsters } from '../api/open5e';

export interface Monster {
    id: string;
    name: string;
    challenge_rating: string;
    hit_points: number;
    type: string;
    armor_class: number;
    environments: string[];
    desc: string;
    size: string;
    alignment: string;
    speed: { walk: number };
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    damage_vulnerabilities: string;
    damage_resistances: string;
    senses: string;
    languages: string;
    actions: { name: string; desc: string }[];
    special_abilities: { name: string; desc: string }[];
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