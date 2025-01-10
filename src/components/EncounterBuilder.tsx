import React, { useState } from 'react';
import { calculateExperienceBudget, calculateTotalMonsterExperience } from '../utils/helpers';
import MonsterSection from './MonsterSection';
import PartyMember from './PartyMember';
import MonsterDetails from './MonsterDetails';
import './EncounterBuilder.css';
import { Monster } from '../types/monsters';

const environments = [
    "Arctic", "Coastal", "Desert", "Forest", "Grassland", "Hill", "Mountain", "Swamp", "Underdark", "Underwater", "Urban"
];

const EncounterBuilder = () => {
    const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
    const [partyMembers, setPartyMembers] = useState<{ id: number, level: number }[]>([]);
    const [nextPartyMemberId, setNextPartyMemberId] = useState(1);
    const [selectedEnvironment, setSelectedEnvironment] = useState<string>('');
    const [collapsedMonsters, setCollapsedMonsters] = useState<{ [key: number]: boolean }>({});

    const handleMonsterSelect = (monster: Monster) => {
        setSelectedMonsters((prev) => [...prev, monster]);
    };

    const handleMonsterRemove = (idx: number) => {
        setSelectedMonsters((prev) => {
            const newMonsters = prev.filter((_, index) => index !== idx);
            return newMonsters;
        });
        setCollapsedMonsters((prev) => {
            const newCollapsed = { ...prev };
            Object.keys(newCollapsed).forEach((key) => {
                const keyNum = parseInt(key, 10);
                if (keyNum > idx) {
                    newCollapsed[keyNum - 1] = newCollapsed[keyNum];
                }
            });
            delete newCollapsed[Object.keys(newCollapsed).length];
            return newCollapsed;
        });
    };

    const handleRemoveAllMonsters = () => {
        setSelectedMonsters([]);
        setCollapsedMonsters({});
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

    const toggleMonsterCollapse = (idx: number) => {
        setCollapsedMonsters((prev) => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const experienceBudgetTotal = calculateExperienceBudget(partyMembers);
    const totalMonsterExperience = calculateTotalMonsterExperience(selectedMonsters);

    const determineDifficulty = () => {
        if (totalMonsterExperience < experienceBudgetTotal.moderate) {
            return 'Low';
        } else if (totalMonsterExperience < experienceBudgetTotal.high) {
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
        ...Array.from({ length: 30 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }))
    ];

    return (
        <div className="encounter-builder">
            <h1>Encounter Builder</h1>
            <div className="top-section">
                <div className="party-members-section">
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
                    <div className="experience-section">
                        <h2>Experience Budget</h2>
                        <div className="experience-budget">
                            <p className="experience-budget-low">Low: {experienceBudgetTotal.low}</p>
                            <p className="experience-budget-moderate">Moderate: {experienceBudgetTotal.moderate}</p>
                            <p className="experience-budget-high">High: {experienceBudgetTotal.high}</p>
                        </div>
                        <h2>Total Monster Experience</h2>
                        <p>{totalMonsterExperience}</p>
                        <h2>Encounter Difficulty</h2>
                        <p>{difficulty}</p>
                    </div>
                </div>
                <div className="selected-monsters-section">
                    <h2>Selected Monsters
                        {selectedMonsters.length > 0 && (
                            <button onClick={handleRemoveAllMonsters}>Remove All</button>
                        )}
                    </h2>
                    {selectedMonsters.length > 0 ? (
                        <ul className="monster-list">
                            {selectedMonsters.map((monster, idx) => (
                                <li key={monster.id} className="monster-item">
                                    <span className="monster-name">{monster.name}</span>
                                    <button onClick={() => handleMonsterRemove(idx)}>Remove</button>
                                    <button onClick={() => toggleMonsterCollapse(idx)}>
                                        {collapsedMonsters[idx] ? 'Show Info' : 'Hide Info'}
                                    </button>
                                    {!collapsedMonsters[idx] && (
                                        <MonsterDetails monster={monster} />
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No monsters selected</p>
                    )}
                </div>
                <div className="environment-section">
                    <h2>Select Environment</h2>
                    <select value={selectedEnvironment} onChange={handleEnvironmentChange}>
                        <option value="">All</option>
                        {environments.map(env => (
                            <option key={env} value={env}>{env}</option>
                        ))}
                    </select>
                    <h2>Select Monsters</h2>
                    {crValues.map(cr => (
                        <MonsterSection key={cr.value} cr={cr.value.toString()} label={cr.label} environments={[selectedEnvironment]} onSelectMonster={handleMonsterSelect} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EncounterBuilder;