import React, { useState } from 'react';
import { Monster } from '../services/encounterService';
import MonsterSection from './MonsterSection';
import PartyMember from './PartyMember';

const experienceBudget = [
    [50, 75, 100], [100, 150, 200], [150, 225, 400], [250, 375, 500], [500, 750, 1100],
    [600, 1000, 1400], [750, 1300, 1700], [1000, 1700, 2100], [1300, 2000, 2600], [1600, 2300, 3100],
    [1900, 2900, 4100], [2200, 3700, 4700], [2600, 4200, 5400], [2900, 4900, 6200], [3300, 5400, 7800],
    [3800, 6100, 9800], [4500, 7200, 11700], [5000, 8700, 14200], [5500, 10700, 17200], [6400, 13200, 22000]
];

const crExperiencePoints: { [key: number]: number } = {
    0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100, 5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000,
    10: 5900, 11: 7200, 12: 8400, 13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000, 18: 20000, 19: 22000, 20: 25000,
    21: 33000, 22: 41000, 23: 50000, 24: 62000, 25: 75000, 26: 90000, 27: 105000, 28: 120000, 29: 135000, 30: 155000
};

const environments = [
    "Underdark", "Sewer", "Caverns", "Plane Of Water", "Water"
];

const EncounterBuilder = () => {
    const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
    const [partyMembers, setPartyMembers] = useState<{ id: number, level: number }[]>([]);
    const [nextPartyMemberId, setNextPartyMemberId] = useState(1);
    const [selectedEnvironment, setSelectedEnvironment] = useState<string>('');

    const handleMonsterSelect = (monster: Monster) => {
        setSelectedMonsters((prev) => [...prev, monster]);
    };

    const handleMonsterRemove = (monsterId: string) => {
        setSelectedMonsters((prev) => prev.filter(monster => monster.id !== monsterId));
    };

    const handleAddPartyMember = () => {
        setPartyMembers((prev) => [...prev, { id: nextPartyMemberId, level: 1 }]);
        setNextPartyMemberId((prev) => prev + 1);
    };

    const handlePartyMemberLevelChange = (id: number, level: number) => {
        setPartyMembers((prev) => prev.map(member => member.id === id ? { ...member, level } : member));
    };

    const handlePartyMemberRemove = (id: number) => {
        setPartyMembers((prev) => prev.filter(member => member.id !== id));
    };

    const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEnvironment(event.target.value);
    };

    const calculateExperienceBudget = () => {
        return partyMembers.reduce((acc, member) => {
            const [low, moderate, high] = experienceBudget[member.level - 1];
            return {
                low: acc.low + low,
                moderate: acc.moderate + moderate,
                high: acc.high + high
            };
        }, { low: 0, moderate: 0, high: 0 });
    };

    const calculateTotalMonsterExperience = () => {
        return selectedMonsters.reduce((total, monster) => {
            const cr = parseFloat(monster.challenge_rating.toString());
            return total + (crExperiencePoints[cr] || 0);
        }, 0);
    };

    const experienceBudgetTotal = calculateExperienceBudget();
    const totalMonsterExperience = calculateTotalMonsterExperience();

    const determineDifficulty = () => {
        if (totalMonsterExperience <= experienceBudgetTotal.low) {
            return 'Low';
        } else if (totalMonsterExperience <= experienceBudgetTotal.moderate) {
            return 'Moderate';
        } else {
            return 'High';
        }
    };

    const difficulty = determineDifficulty();

    const crValues = [
        { value: 0, label: '0' },
        { value: 0.125, label: '1/8' },
        { value: 0.25, label: '1/4' },
        { value: 0.5, label: '1/2' },
        ...Array.from({ length: 31 }, (_, i) => ({ value: i, label: i.toString() }))
    ];

    return (
        <div>
            <h1>Encounter Builder</h1>
            <div>
                <h2>Select Environment</h2>
                <select value={selectedEnvironment} onChange={handleEnvironmentChange}>
                    <option value="">All</option>
                    {environments.map(env => (
                        <option key={env} value={env}>{env}</option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Select Monsters</h2>
                {crValues.map(cr => (
                    <MonsterSection key={cr.value} cr={cr.value.toString()} label={cr.label} environments={[selectedEnvironment]} onSelectMonster={handleMonsterSelect} />
                ))}
            </div>
            <div>
                <h2>Selected Monsters</h2>
                {selectedMonsters.length > 0 ? (
                    <ul>
                        {selectedMonsters.map((monster) => (
                            <li key={monster.id}>
                                <button onClick={() => handleMonsterRemove(monster.id)}>Remove</button>
                                <pre>{JSON.stringify(monster, null, 2)}</pre>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No monsters selected</p>
                )}
            </div>
            <div>
                <h2>Party Members</h2>
                <button onClick={handleAddPartyMember}>Add Party Member</button>
                {partyMembers.map(member => (
                    <PartyMember
                        key={member.id}
                        id={member.id}
                        level={member.level}
                        onLevelChange={handlePartyMemberLevelChange}
                        onRemove={handlePartyMemberRemove}
                    />
                ))}
            </div>
            <div>
                <h2>Experience Budget</h2>
                <p>Low: {experienceBudgetTotal.low}</p>
                <p>Moderate: {experienceBudgetTotal.moderate}</p>
                <p>High: {experienceBudgetTotal.high}</p>
            </div>
            <div>
                <h2>Total Monster Experience</h2>
                <p>{totalMonsterExperience}</p>
                <h2>Encounter Difficulty</h2>
                <p>{difficulty}</p>
            </div>
        </div>
    );
};

export default EncounterBuilder;