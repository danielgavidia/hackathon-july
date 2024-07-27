import "../styles/navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div>Racing Application</div>
            <div className="balance">Balance</div>
            <div className="balance-amount">$100</div>
            <div className="race-start">Start</div>
        </div>
    );
};

export default Navbar;
