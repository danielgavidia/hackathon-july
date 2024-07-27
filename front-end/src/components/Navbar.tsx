// src/components/Navbar.tsx

import React from "react";
import "../styles/navbar.css";
import axios from "axios";
import { useState } from "react";


const Navbar = () => {
    const [betInput, setBetInput] = useState<number | string>(0);
    const [bet, setBet] = useState<number | string>(0);

    console.log(`bet: ${bet}`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // If the input is empty, set betInput to an empty string
        if (value === "") {
            setBetInput("");
        } else {
            // Otherwise, convert the input to a number
            setBetInput(Number(value));
        }
    };

    const handleSetBetForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBet(betInput);
    };

    const handleSetBet = () => {
        setBet(betInput);
    };

    const handleNewGame = async () => {
        try {
            const response = await axios.get(
                "https://infinity-ai.fly.dev/generate"
            );
            console.log(response);
        } catch (error) {
            console.log(error);
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
                <form onSubmit={handleSetBetForm}>
                    <input
                        className="betting-amount"
                        type="number"
                        value={betInput}
                        onChange={handleChange}
                    />{" "}
                </form>
                <button className="race-start" onClick={handleSetBet}>
                    Start
                </button>
            </div>
        </div>
    );
};

export default Navbar;
