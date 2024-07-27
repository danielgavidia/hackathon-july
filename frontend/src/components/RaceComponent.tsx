import React, { useState, useEffect } from "react";
import "../styles/RaceComponent.css";

interface AnimalStats {
  name: string;
  emoji: string;
  speed: number;
  strength: number;
  endurance: number;
  agility: number;
  acceleration: number;
  reaction_time: number;
  stamina: number;
  recovery: number;
  focus: number;
  consistency: number;
  experience: number;
}

interface RaceComponentProps {
  animals: AnimalStats[];
  startRace: boolean;
  maxDistance: number;
}

const RaceComponent: React.FC<RaceComponentProps> = ({
  animals,
  startRace,
  maxDistance,
}) => {
  const [positions, setPositions] = useState<number[]>(
    new Array(animals.length).fill(0)
  );
  const [winner, setWinner] = useState<string | null>(null);
  useEffect(() => {
    console.log("RaceComponent useEffect triggered");
    console.log("Race started:", startRace);
    console.log("Animals:", animals);
    console.log("Current positions:", positions);

    if (startRace && animals.length > 0) {
      console.log("Starting the race interval");

      const interval = setInterval(() => {
        setPositions((prevPositions) => {
          console.log("Previous positions:", prevPositions);

          const newPositions = prevPositions.map((pos, index) => {
            const newPos = pos + calculateSpeed(animals[index]);
            console.log(`Animal ${index} new position:`, newPos);

            if (newPos >= maxDistance && !winner) {
              console.log(`Winner found: ${animals[index].name}`);
              setWinner(animals[index].name);
            }

            return newPos >= maxDistance ? maxDistance : newPos;
          });

          console.log("Updated positions:", newPositions); // Log new positions
          return newPositions;
        });
      }, 500);

      return () => {
        console.log("Clearing interval");
        clearInterval(interval);
      };
    }
  }, [startRace, animals, maxDistance, winner]);

  const calculateSpeed = (animal: AnimalStats) => {
    const speed = animal.speed / 10;
    console.log(`Calculated speed for ${animal.name}:`, speed);
    return speed;
  };

  return (
    <div className="race-track">
      {animals.map((animal, index) => (
        <div
          key={index}
          className="animal-track"
          style={{ top: `${index * 25}%` }} // Position each track vertically
        >
          <div
            className="animal"
            style={{
              left: `${(positions[index] / maxDistance) * 100}%`,
            }}
          >
            {animal.emoji}
          </div>
        </div>
      ))}
      {winner && <div className="winner">{winner} IS THE WINNER!</div>}
    </div>
  );
};

export default RaceComponent;
