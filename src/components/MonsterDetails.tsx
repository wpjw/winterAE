import React from "react";
import { Monster } from "../types/monsters";
export interface MonsterDetailsProps {
  monster: Monster;
}

const MonsterDetails: React.FC<MonsterDetailsProps> = ({ monster }) => {
  return (
    <div className="monster-details">
      <h3>{monster.name}</h3>
      {monster.type && (
        <p>
          <strong>Type:</strong> {monster.type}
        </p>
      )}
      {monster.size && (
        <p>
          <strong>Size:</strong> {monster.size}
        </p>
      )}
      {monster.alignment && (
        <p>
          <strong>Alignment:</strong> {monster.alignment}
        </p>
      )}
      {Boolean(monster.armor_class) && (
        <p>
          <strong>Armor Class:</strong> {monster.armor_class}
        </p>
      )}
      {Boolean(monster.hit_points) && (
        <p>
          <strong>Hit Points:</strong> {monster.hit_points}
        </p>
      )}
      {Boolean(monster.speed.walk) && (
        <p>
          <strong>Speed:</strong> {monster.speed.walk} ft.
        </p>
      )}
      {monster.speed.fly && (
        <p>
          <strong>Fly Speed:</strong> {monster.speed.fly} ft.
        </p>
      )}
      {monster.speed.swim && (
        <p>
          <strong>Swim Speed:</strong> {monster.speed.swim} ft.
        </p>
      )}
      {Boolean(monster.challenge_rating) && (
        <p>
          <strong>Challenge Rating:</strong> {monster.challenge_rating}
        </p>
      )}
      {Boolean(monster.strength) && (
        <p>
          <strong>Strength:</strong> {monster.strength}
        </p>
      )}
      {Boolean(monster.dexterity) && (
        <p>
          <strong>Dexterity:</strong> {monster.dexterity}
        </p>
      )}
      {Boolean(monster.constitution) && (
        <p>
          <strong>Constitution:</strong> {monster.constitution}
        </p>
      )}
      {Boolean(monster.intelligence) && (
        <p>
          <strong>Intelligence:</strong> {monster.intelligence}
        </p>
      )}
      {Boolean(monster.wisdom) && (
        <p>
          <strong>Wisdom:</strong> {monster.wisdom}
        </p>
      )}
      {Boolean(monster.charisma) && (
        <p>
          <strong>Charisma:</strong> {monster.charisma}
        </p>
      )}
      {monster.damage_vulnerabilities && (
        <p>
          <strong>Damage Vulnerabilities:</strong>{" "}
          {monster.damage_vulnerabilities}
        </p>
      )}
      {monster.damage_resistances && (
        <p>
          <strong>Damage Resistances:</strong> {monster.damage_resistances}
        </p>
      )}
      {monster.damage_immunities && (
        <p>
          <strong>Damage Immunities:</strong> {monster.damage_immunities}
        </p>
      )}
      {monster.condition_immunities && (
        <p>
          <strong>Condition Immunities:</strong> {monster.condition_immunities}
        </p>
      )}
      {monster.senses && (
        <p>
          <strong>Senses:</strong> {monster.senses}
        </p>
      )}
      {monster.languages && (
        <p>
          <strong>Languages:</strong> {monster.languages}
        </p>
      )}
      {monster.actions && monster.actions.length > 0 && (
        <>
          <h4>Actions</h4>
          <ul>
            {monster.actions.map((action) => (
              <li key={action.name}>
                <strong>{action.name}:</strong> {action.desc}
              </li>
            ))}
          </ul>
        </>
      )}
      {monster.special_abilities && monster.special_abilities.length > 0 && (
        <>
          <h4>Special Abilities</h4>
          <ul>
            {monster.special_abilities.map((ability) => (
              <li key={ability.name}>
                <strong>{ability.name}:</strong> {ability.desc}
              </li>
            ))}
          </ul>
        </>
      )}
      {monster.legendary_desc && (
        <p>
          <strong>Legendary Description:</strong> {monster.legendary_desc}
        </p>
      )}
      {monster.legendary_actions && monster.legendary_actions.length > 0 && (
        <>
          <h4>Legendary Actions</h4>
          <ul>
            {monster.legendary_actions.map((action) => (
              <li key={action.name}>
                <strong>{action.name}:</strong> {action.desc}
              </li>
            ))}
          </ul>
        </>
      )}
      {monster.reactions && monster.reactions.length > 0 && (
        <>
          <h4>Reactions</h4>
          <ul>
            {monster.reactions.map((reaction) => (
              <li key={reaction.name}>
                <strong>{reaction.name}:</strong> {reaction.desc}
              </li>
            ))}
          </ul>
        </>
      )}
      {monster.bonus_actions && monster.bonus_actions.length > 0 && (
        <>
          <h4>Bonus Actions</h4>
          <ul>
            {monster.bonus_actions.map((action) => (
              <li key={action.name}>
                <strong>{action.name}:</strong> {action.desc}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MonsterDetails;
