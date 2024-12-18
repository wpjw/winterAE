import React, { useState } from 'react';
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

    const loadMonsters = async () => {
        if (!isLoaded) {
            const monsterData = await fetchMonsters(cr, environments);
            setMonsters(monsterData.results);
            setIsLoaded(true);
        }
    };

    return (
        <div>
            <button onClick={loadMonsters} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>
                Monsters with CR {label}
            </button>
            {isLoaded && (
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