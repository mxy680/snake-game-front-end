import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Menu.css'; 
import { usePlayer } from '../PlayerContext'; 

const Menu = () => {

    const { playerId, setPlayerId } = usePlayer(); 

    const handleLogout = () => {
        setPlayerId(null);
    }
    
    return (
        <div className="menu-container">
            <div className="menu-content">
                <h1 className="menu-title">Snake Game!</h1>
                
                <div className="menu-item">
                    <Link to="/play" className="menu-button">Play</Link>
                </div>

                <div className="menu-item">
                    <Link to="/leaderboard" className="menu-button">Leaderboard</Link>
                </div>

                <div className="menu-item">
                    <Link to="/settings" className="menu-button">Settings</Link>
                </div>

                <div className="menu-item">
                    <button onClick={handleLogout} className="menu-button">Logout</button>
                </div>
            </div>
        </div>

    );
}

export default Menu;
