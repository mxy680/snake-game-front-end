import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Leaderboard.css';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const apiPath = 'https://snake-game-j7eb.onrender.com/players';

  const goHome = () => {
    navigate('/menu'); // Navigate to the home route (adjust the route as needed)
  };

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(apiPath); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Sort players by highScore in descending order
        const sortedPlayers = data
          .sort((a, b) => b.highScore - a.highScore)
          .slice(0, 10); // Gets only the first 50 players

        setPlayers(sortedPlayers);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
  
    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard-table-container">
          <table className="leaderboard-table">
              <thead>
                  <tr>
                      <th>Player</th>
                      <th>Score</th>
                  </tr>
              </thead>
              <tbody>
                  {players.map((player, index) => (
                      <tr key={index}>
                          <td>{player.username}</td>
                          <td>{player.highScore}</td> 
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
      <button onClick={goHome} className="back-home">Back Home</button>
    </div>

  );
};

export default Leaderboard;
