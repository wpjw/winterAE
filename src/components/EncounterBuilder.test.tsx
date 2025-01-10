import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EncounterBuilder from './EncounterBuilder';

jest.mock('./MonsterSection', () => () => <div>MonsterSection</div>);
jest.mock('./PartyMember', () => () => <div>PartyMember</div>);
jest.mock('./MonsterDetails', () => () => <div>MonsterDetails</div>);

test('renders EncounterBuilder component', () => {
    render(<EncounterBuilder />);
    const headingElement = screen.getByText(/Encounter Builder/i);
    expect(headingElement).toBeInTheDocument();
});

test('renders party members section', () => {
    render(<EncounterBuilder />);
    const partyMembersSection = screen.getByText(/Party Members/i);
    expect(partyMembersSection).toBeInTheDocument();
});

test('renders selected monsters section', () => {
    render(<EncounterBuilder />);
    const selectedMonstersSection = screen.getByText(/Selected Monsters/i);
    expect(selectedMonstersSection).toBeInTheDocument();
});

test('can add a party member', () => {
    render(<EncounterBuilder />);
    const addButton = screen.getByText(/Add Party Member/i);
    fireEvent.click(addButton);
    const partyMember = screen.getByText(/PartyMember/i);
    expect(partyMember).toBeInTheDocument();
});