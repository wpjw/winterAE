import React, { useState, useCallback } from "react";
import { fetchMonsters } from "../api/open5e";
import "./MonsterSection.css";
import { Monster } from "../types/monsters";

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
