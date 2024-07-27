import React from "react";
import "../styles/navbar.css";
import axios from "axios";
import { useState } from "react";

interface NavbarProps {
    onStartRace: () => void;
    onNewGameData: (response: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartRace, onNewGameData }) => {
    const [betAmount, setBetAmount] = useState<string>("");
    const [bet, setBet] = useState<number | null>(null);

    console.log(`bet: ${bet}`);

    const handleNewGame = async () => {
        try {
            const response = await axios.get(
                "https://infinity-ai.fly.dev/generate"
            );
            console.log(response);
            onNewGameData(response);
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
            <div className="title">Racing Application</div>
            <div className="functionality">
                <button className="new-game" onClick={() => handleNewGame()}>
                    New Game
                </button>
                <div className="balance">Balance</div>
                <div className="balance-amount">$100</div>
                <div className="betting">Bet:</div>
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
