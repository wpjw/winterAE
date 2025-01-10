import React from 'react';
import { render, screen } from '@testing-library/react';
import MonsterDetails from './MonsterDetails';

test('renders MonsterDetails component', () => {
    const monster = { 
        id: '1',
        name: 'Adult Blue Dragon',
        type: 'Dragon',
        challenge_rating: '16',
        hit_points: 225,
        armor_class: 19,
        environments: ['desert'],
        desc: 'A large and terrifying dragon with blue scales.',
        size: 'Huge',
        alignment: 'Lawful Evil',
        speed: { walk: 40, fly: 80 },
        senses: 'blindsight 60 ft., darkvision 120 ft., passive Perception 22',
        languages: 'Common, Draconic',
        strength: 25,
        dexterity: 10,
        constitution: 23,
        intelligence: 16,
        wisdom: 15,
        charisma: 19,
        actions: [],
        legendary_actions: [],
        special_abilities: [],
        damage_vulnerabilities: '',
        damage_resistances: '',
        damage_immunities: '',
        condition_immunities: '',
    }; 
    render(<MonsterDetails monster={monster} />);
    const linkElement = screen.getByText(/Adult Blue Dragon/i);
    expect(linkElement).toBeInTheDocument();
});