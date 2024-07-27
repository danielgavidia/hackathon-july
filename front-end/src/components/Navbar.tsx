import "../styles/navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="title">Racing Application</div>
            <div className="functionality">
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
