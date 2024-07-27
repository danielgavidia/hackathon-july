import "../styles/navbar.css";
import { useState } from "react";

const Ribbon = () => {
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

    return (
        <div className="navbar">
            <div className="functionality">
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

export default Ribbon;
