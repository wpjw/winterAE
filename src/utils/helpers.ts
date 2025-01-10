import { Monster } from "../types/monsters";

// Experience budget table for different levels of difficulty
const experienceBudget = [
  [50, 75, 100], // Level 1
  [100, 150, 200], // Level 2
  [150, 225, 400], // Level 3
  [250, 375, 500], // Level 4
  [500, 750, 1100], // Level 5
  [600, 1000, 1400], // Level 6
  [750, 1300, 1700], // Level 7
  [1000, 1700, 2100], // Level 8
  [1300, 2000, 2600], // Level 9
  [1600, 2300, 3100], // Level 10
  [1900, 2900, 4100], // Level 11
  [2200, 3700, 4700], // Level 12
  [2600, 4200, 5400], // Level 13
  [2900, 4900, 6200], // Level 14
  [3300, 5400, 7800], // Level 15
  [3800, 6100, 9800], // Level 16
  [4500, 7200, 11700], // Level 17
  [5000, 8700, 14200], // Level 18
  [5500, 10700, 17200], // Level 19
  [6400, 13200, 22000], // Level 20
];

// Experience points for each challenge rating (CR)
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

// Function to calculate the total experience budget for the party
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
// Function to calculate the total experience of the selected monsters
export const calculateTotalMonsterExperience = (
  selectedMonsters: Monster[]
) => {
  return selectedMonsters.reduce((total, monster) => {
    const cr = parseFloat(monster.challenge_rating.toString());
    return total + (crExperiencePoints[cr] || 0);
  }, 0);
};
