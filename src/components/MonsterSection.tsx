import React, { useState, useCallback } from "react";
import { fetchMonsters } from "../api/open5e";
import "./MonsterSection.css";

// Define the Monster interface to type the monster objects
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

// Define the props for the MonsterSection component
interface MonsterSectionProps {
  cr: string; // Challenge rating filter
  label: string; // Label for the section
  environments: string[]; // Environments filter
  onSelectMonster: (monster: Monster) => void; // Callback when a monster is selected
}

const MonsterSection: React.FC<MonsterSectionProps> = ({
  cr,
  label,
  environments,
  onSelectMonster,
}) => {
  // State to store the list of monsters
  const [monsters, setMonsters] = useState<Monster[]>([]);
  // State to track if the data is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // State to track if the section is collapsed
  const [isCollapsed, setIsCollapsed] = useState(true);
  // State to track if the data is loading
  const [isLoading, setIsLoading] = useState(false);
  // Filter monsters based on the environments prop
  const filteredMonsters = environments.includes("")
    ? monsters
    : monsters.filter((monster: Monster) =>
        environments.some((env) => monster.environments.includes(env))
      );

  // Function to fetch monsters from the API
  const loadMonsters = useCallback(async () => {
    setIsLoading(true);
    const monsterData = await fetchMonsters(cr);

    setMonsters(monsterData.results);
    setIsLoaded(true);
    setIsLoading(false);
  }, [cr]);

  // Function to handle the collapse toggle
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
      {!isCollapsed &&
        (isLoading ? (
          "Loading..."
        ) : (
          <ul className="monster-list">
            {filteredMonsters.map((monster) => (
              <li key={monster.id} className="monster-item">
                <button
                  onClick={() => onSelectMonster(monster)}
                  className="monster-select-button"
                >
                  {monster.name}
                </button>
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
};

export default MonsterSection;
