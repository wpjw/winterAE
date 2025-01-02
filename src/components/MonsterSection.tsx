import React, { useState, useEffect, useCallback } from 'react';
import { fetchMonsters } from '../api/open5e';

interface Monster {
    id: string;
    name: string;
    challenge_rating: string;
    hit_points: number;
    type: string;
    armor_class: number;
    environments: string[];
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
        const monsterData = await fetchMonsters(cr, environments);
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
        <div>
            <button onClick={handleButtonClick} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>
                Monsters with CR {label}
            </button>
            {!isCollapsed && (
                <ul>
                    {monsters.map((monster) => (
                        <li key={monster.id}>
                            <button onClick={() => onSelectMonster(monster)}>
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