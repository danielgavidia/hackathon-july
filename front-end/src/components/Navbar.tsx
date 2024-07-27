import "../styles/navbar.css";
import axios from "axios";

const Navbar = () => {
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
                <div className="betting-amount">$20</div>
                <div className="race-start">Start</div>
            </div>
        </div>
    );
};

export default Navbar;