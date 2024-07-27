// src/components/Navbar.tsx

import React from "react";
import "../styles/navbar.css";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const [betInput, setBetInput] = useState<number | string>(0);
  const [bet, setBet] = useState<number | string>(0);

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
        <button className="race-start" onClick={onStartRace}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Navbar;
