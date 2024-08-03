import "./app.css";
import React, { useState, useEffect } from "react";
import Chat from "./components/Chat";
import RaceComponent from "./components/RaceComponent";
import Navbar from "./components/Navbar";

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
    performance_score: number;
    odds: number;
}

const App: React.FC = () => {
    const [startRace, setStartRace] = useState(false);
    const [animals, setAnimals] = useState<AnimalStats[]>([]);

    const handleStartRace = () => {
        console.log("Start race button clicked");
        setStartRace(true);
    };

    const handleNewGameData = (response: any) => {
        const animalsArray = response.data || [];
        if (Array.isArray(animalsArray)) {
            const newAnimals: AnimalStats[] = animalsArray.map(
                (animal: any) => ({
                    name: animal.name,
                    emoji: animal.emoji,
                    speed: animal.speed,
                    strength: animal.strength,
                    endurance: animal.endurance,
                    agility: animal.agility,
                    acceleration: animal.acceleration,
                    reaction_time: animal.reaction_time,
                    stamina: animal.stamina,
                    recovery: animal.recovery,
                    focus: animal.focus,
                    consistency: animal.consistency,
                    experience: animal.experience,
                    performance_score: animal.number,
                    odds: animal.number,
                })
            );

<<<<<<< HEAD:front-end/src/App.tsx
            console.log("New animals generated:", newAnimals);
            setAnimals(newAnimals);
            setStartRace(false); // Reset race when new animals are generated
        } else {
            console.error("Expected an array but received:", animalsArray);
        }
    };

    const maxDistance = 100; // Example max distance

    useEffect(() => {
        console.log("App: startRace changed to", startRace);
        console.log("App: animals", animals);
    }, [startRace, animals]);

    return (
        <div className="App">
            <Navbar
                onStartRace={handleStartRace}
                onNewGameData={handleNewGameData}
            />
            <RaceComponent
                animals={animals}
                startRace={startRace}
                maxDistance={maxDistance}
            />
            <Chat />
        </div>
    );
=======
      console.log("New animals generated:", newAnimals);
      setAnimals(newAnimals);
      setStartRace(false); // Reset race when new animals are generated
    } else {
      console.error("Expected an array but received:", animalsArray);
    }
  };

  const maxDistance = 100; // Example max distance

  useEffect(() => {
    console.log("App: startRace changed to", startRace);
    console.log("App: animals", animals);
  }, [startRace, animals]);

  return (
    <div className="App">
      <Navbar onStartRace={handleStartRace} onNewGameData={handleNewGameData} />
      <RaceComponent
        animals={animals}
        startRace={startRace}
        maxDistance={maxDistance}
      />
      <Chat />
    </div>
  );
>>>>>>> attempt-to-merge-back-and-front:frontend/src/App.tsx
};

export default App;
