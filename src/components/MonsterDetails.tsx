import React from 'react';

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

export interface MonsterDetailsProps {
    monster: Monster;
}

const MonsterDetails: React.FC<MonsterDetailsProps> = ({ monster }) => {
    return (
        <div className="monster-details">
            <h3>{monster.name}</h3>
            <p><strong>Type:</strong> {monster.type}</p>
            <p><strong>Size:</strong> {monster.size}</p>
            <p><strong>Alignment:</strong> {monster.alignment}</p>
            <p><strong>Armor Class:</strong> {monster.armor_class}</p>
            <p><strong>Hit Points:</strong> {monster.hit_points}</p>
            <p><strong>Speed:</strong> {monster.speed.walk} ft.</p>
            <p><strong>Challenge Rating:</strong> {monster.challenge_rating}</p>
            <p><strong>Strength:</strong> {monster.strength}</p>
            <p><strong>Dexterity:</strong> {monster.dexterity}</p>
            <p><strong>Constitution:</strong> {monster.constitution}</p>
            <p><strong>Intelligence:</strong> {monster.intelligence}</p>
            <p><strong>Wisdom:</strong> {monster.wisdom}</p>
            <p><strong>Charisma:</strong> {monster.charisma}</p>
            <p><strong>Damage Vulnerabilities:</strong> {monster.damage_vulnerabilities}</p>
            <p><strong>Damage Resistances:</strong> {monster.damage_resistances}</p>
            <p><strong>Senses:</strong> {monster.senses}</p>
            <p><strong>Languages:</strong> {monster.languages}</p>
            <h4>Actions</h4>
            <ul>
                {monster.actions.map(action => (
                    <li key={action.name}>
                        <strong>{action.name}:</strong> {action.desc}
                    </li>
                ))}
            </ul>
            <h4>Special Abilities</h4>
            <ul>
                {monster.special_abilities.map(ability => (
                    <li key={ability.name}>
                        <strong>{ability.name}:</strong> {ability.desc}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MonsterDetails;