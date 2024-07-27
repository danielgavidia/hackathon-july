import React, { useState, useEffect, useRef } from "react";
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
  const [positions, setPositions] = useState<number[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const raceInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPositions(new Array(animals.length).fill(0));
    setWinner(null);
  }, [animals]);

  useEffect(() => {
    console.log("Race status changed. StartRace:", startRace);
    if (startRace && animals.length > 0) {
      console.log("Race is starting!");
      if (raceInterval.current) clearInterval(raceInterval.current);

      raceInterval.current = setInterval(() => {
        setPositions((prevPositions) => {
          const newPositions = prevPositions.map((pos, index) => {
            const speed = calculateSpeed(animals[index]);
            const newPos = Math.min(pos + speed, maxDistance);
            console.log(
              `${animals[index].name} moved from ${pos} to ${newPos}`
            );
            return newPos;
          });

          const raceFinished = newPositions.some((pos) => pos >= maxDistance);
          if (raceFinished && !winner) {
            const winnerIndex = newPositions.findIndex(
              (pos) => pos >= maxDistance
            );
            setWinner(animals[winnerIndex].name);
            if (raceInterval.current) clearInterval(raceInterval.current);
          }

          return newPositions;
        });
      }, 100); // Update more frequently for smoother animation
    } else {
      if (raceInterval.current) clearInterval(raceInterval.current);
    }

    return () => {
      if (raceInterval.current) clearInterval(raceInterval.current);
    };
  }, [startRace, animals, maxDistance]);

  const calculateSpeed = (animal: AnimalStats) => {
    return (animal.speed / 10) * (Math.random() * 0.5 + 0.75); // Add some randomness
  };

  if (animals.length === 0) {
    return <div>No animals to race. Please start a new game.</div>;
  }

  return (
    <div className="race-track">
      {animals.map((animal, index) => (
        <div key={index} className="animal-track">
          <div
            className="animal"
            style={{
              left: `${(positions[index] / maxDistance) * 100}%`,
            }}
          >
            {animal.emoji} {animal.name}
          </div>
        </div>
      ))}
      {winner && <div className="winner">{winner} IS THE WINNER!</div>}
    </div>
  );
};

export default RaceComponent;
