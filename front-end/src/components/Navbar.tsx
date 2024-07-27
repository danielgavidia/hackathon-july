import React from "react";
import "../styles/navbar.css";
import axios from "axios";
import { useState } from "react";
import Dropdown from "./Dropdown";

interface NavbarProps {
    onStartRace: () => void;
    onNewGameData: (response: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartRace, onNewGameData }) => {
    const [betAmount, setBetAmount] = useState<string>("10");
    const [bet, setBet] = useState<number | null>(null);
    const [options, setOptions] = useState<Array<string>>([""]);

    const [selection, setSelection] = useState<string>("");
    const handleSetSelection = (selectedOption: string) => {
        setSelection(selectedOption);
    };

    console.log(`bet: ${bet}`);
    console.log(`selection: ${selection}`);

    const handleNewGame = async () => {
        try {
            const response = await axios.get(
                "https://infinity-ai.fly.dev/generate"
            );
            console.log(response);
            const options = response.data.map((x: { name: string }) => x.name);
            onNewGameData(response);
            setOptions(options);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBetAmount(e.target.value);
    };

    const handleStartRace = () => {
        const betValue = Number(betAmount);
        if (!isNaN(betValue)) {
            setBet(betValue);
            onStartRace();
        }
    };

    return (
        <div className="navbar">
            <div className="title">The Amazing Race</div>
            <div className="functionality">
                <button className="new-game" onClick={() => handleNewGame()}>
                    New Game
                </button>
                <div className="balance">Balance</div>
                <div className="balance-amount">$100</div>
                <div className="choose-racer">Choose racer</div>
                <Dropdown options={options} onSelect={handleSetSelection} />
                <div className="betting">Bet Amount:</div>
                <form>
                    <input
                        className="betting-amount"
                        type="number"
                        value={betAmount}
                        onChange={handleChange}
                    />
                </form>
                <button className="race-start" onClick={handleStartRace}>
                    Start
                </button>
            </div>
        </div>
    );
};

export default Navbar;
