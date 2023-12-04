import React, { useState, useEffect } from 'react';
import { usePlayer } from '../PlayerContext';
import { useNavigate } from 'react-router-dom';
import './styles/EnterCredentials.css';

const EnterCredentials = () => {
  const [players, setPlayers] = useState([]); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setPlayerId } = usePlayer();
  const navigate = useNavigate();

  const apiPath = 'https://snake-game-j7eb.onrender.com/players';

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch(apiPath);
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getPlayers();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const player = players.find((player) => player.username === username);
    if (player) {
      if (player.password !== password) {
        alert('Incorrect password');
        return;
      }
      setPlayerId(player._id);
      navigate('/menu');
      return;
    }
    
    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();  
      if (data._id) {
        setPlayerId(data._id);
        navigate('/menu');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <div className="credentials-container">
    <form onSubmit={handleSubmit} className="credentials-form">
      <h1 className="form-title">Login/Signup</h1>
      <p className="form-description">Please enter your username and password.</p>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <p className="form-footnote">Note: This website does not implement real security measures.</p>
      </form>
    </div>
  );
}

export default EnterCredentials;
