interface Monster {
    armor_class: any;
    type: any;
    id: string;
    name: string;
    challenge_rating: number;
    hit_points: number;
}

export const calculateChallengeRating = (monsters: Monster[]) => {
    // Implement logic to calculate the challenge rating based on the monsters
    let totalCR = 0;
    monsters.forEach(monster => {
        totalCR += Number(monster.challenge_rating);
    });
    return totalCR / monsters.length;
};

export const formatMonsterData = (monster: Monster) => {
    // Format the monster data for display
    return {
        name: monster.name,
        type: monster.type,
        hitPoints: monster.hit_points,
        armorClass: monster.armor_class,
        challengeRating: monster.challenge_rating,
    };
};