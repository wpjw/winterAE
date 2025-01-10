import { Monster } from "../types/monsters";

const experienceBudget = [
  [50, 75, 100],
  [100, 150, 200],
  [150, 225, 400],
  [250, 375, 500],
  [500, 750, 1100],
  [600, 1000, 1400],
  [750, 1300, 1700],
  [1000, 1700, 2100],
  [1300, 2000, 2600],
  [1600, 2300, 3100],
  [1900, 2900, 4100],
  [2200, 3700, 4700],
  [2600, 4200, 5400],
  [2900, 4900, 6200],
  [3300, 5400, 7800],
  [3800, 6100, 9800],
  [4500, 7200, 11700],
  [5000, 8700, 14200],
  [5500, 10700, 17200],
  [6400, 13200, 22000],
];

const crExperiencePoints: { [key: number]: number } = {
  0: 10,
  0.125: 25,
  0.25: 50,
  0.5: 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
};

export const calculateExperienceBudget = (
  partyMembers: { id: number; level: number }[]
) => {
  return partyMembers.reduce(
    (acc, member) => {
      const [low, moderate, high] = experienceBudget[member.level - 1];
      return {
        low: acc.low + low,
        moderate: acc.moderate + moderate,
        high: acc.high + high,
      };
    },
    { low: 0, moderate: 0, high: 0 }
  );
};

export const calculateTotalMonsterExperience = (
  selectedMonsters: Monster[]
) => {
  return selectedMonsters.reduce((total, monster) => {
    const cr = parseFloat(monster.challenge_rating.toString());
    return total + (crExperiencePoints[cr] || 0);
  }, 0);
};
