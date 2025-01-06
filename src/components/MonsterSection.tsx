import React, { useState, useEffect, useCallback } from 'react';
import { fetchMonsters } from '../api/open5e';
import './MonsterSection.css';

interface Monster {
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

interface MonsterSectionProps {
    cr: string;
    label: string;
    environments: string[];
    onSelectMonster: (monster: Monster) => void;
}

const MonsterSection: React.FC<MonsterSectionProps> = ({ cr, label, environments, onSelectMonster }) => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const loadMonsters = useCallback(async () => {
        const monsterData = await fetchMonsters(cr, );
        const filteredMonsters = environments.includes('')
            ? monsterData.results
            : monsterData.results.filter((monster: Monster) =>
                environments.some(env => monster.environments.includes(env))
            );
        setMonsters(filteredMonsters);
        setIsLoaded(true);
    }, [cr, environments]);

    useEffect(() => {
        if (isLoaded) {
            loadMonsters();
        }
    }, [environments, isLoaded, loadMonsters]);

    const handleButtonClick = () => {
        if (!isLoaded) {
            loadMonsters();
        }
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="monster-section">
            <button onClick={handleButtonClick} className="monster-section-button">
                Monsters with CR {label}
            </button>
            {!isCollapsed && (
                <ul className="monster-list">
                    {monsters.map((monster) => (
                        <li key={monster.id} className="monster-item">
                            <button onClick={() => onSelectMonster(monster)} className="monster-select-button">
                                {monster.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MonsterSection;