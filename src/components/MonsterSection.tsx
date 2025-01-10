import React, { useState, useCallback } from 'react';
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
    damage_immunities: string;
    condition_immunities: string;
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
    const [isLoading, setIsLoading] = useState(false);
    const filteredMonsters = environments.includes('')
            ? monsters
            : monsters.filter((monster: Monster) =>
                environments.some(env => monster.environments.includes(env))
            );

    const loadMonsters = useCallback(async () => {
        setIsLoading(true);
        const monsterData = await fetchMonsters(cr, );
        
        setMonsters(monsterData.results);
        setIsLoaded(true);
        setIsLoading(false);
    }, [cr]);


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
            {!isCollapsed && ( isLoading ? "Loading..." :
                <ul className="monster-list">
                    {filteredMonsters.map((monster) => (
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