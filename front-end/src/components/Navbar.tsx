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
            </div>
        </div>
    );
};

export default Navbar;
