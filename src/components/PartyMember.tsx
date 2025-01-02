import React from 'react';

interface PartyMemberProps {
    id: number;
    level: number;
    onLevelChange: (id: number, level: number) => void;
    onRemove: (id: number) => void;
}

const PartyMember: React.FC<PartyMemberProps> = ({ id, level, onLevelChange, onRemove }) => {
    const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onLevelChange(id, parseInt(event.target.value, 10));
    };

    return (
        <div className="party-member">
            <label className="party-member-label">
                Level:
                <select value={level} onChange={handleLevelChange} className="party-member-select">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </label>
            <button onClick={() => onRemove(id)} className="party-member-button">Remove</button>
        </div>
    );
};

export default PartyMember;