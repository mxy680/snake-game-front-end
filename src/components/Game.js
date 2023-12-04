import React, { useState, useEffect, useCallback } from 'react';
import './styles/Game.css'
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../PlayerContext';

const Game = () => {
  const { playerId, settings } = usePlayer();
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]); // Snake initial position
  const [food, setFood] = useState({ x: 5, y: 5 }); // Food initial position
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  const [score, setScore] = useState(0); // Assuming you have a way to calculate the score

  const moveSnake = useCallback(() => {
    if (gameOver) {
      return; // Stop moving the snake if the game is over
    }

    setSnake(snake => {
      let newSnake = [...snake];
      let head = { ...newSnake[0] };
  
      // Update the head position based on direction
      if (direction === 'RIGHT') head.x += 1;
      else if (direction === 'LEFT') head.x -= 1;
      else if (direction === 'UP') head.y -= 1;
      else if (direction === 'DOWN') head.y += 1;
  
      // Check for collisions
      const collision = checkCollision(head);
      if (collision) {
        return [{ x: 0, y: 0 }]; // Reset the snake
      }
  
      // Check if food is eaten
      const foodEaten = eatFood(head);
      if (!foodEaten) {
        newSnake.pop(); // Remove tail only if food not eaten
      }
  
      newSnake.unshift(head); // Add new head
  
      return newSnake;
    });
  }, [direction, snake, food]);

  const getRandomCoordinates = () => {
    const min = 1;
    const max = 18;
    const x = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2;
    const y = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2;
    return { x, y };
  };
  
  const eatFood = (head) => {
    if (head.x === food.x && head.y === food.y) {
      // Reposition food
      setFood(getRandomCoordinates());
      setScore(currentScore => currentScore + 1); // Increment score
      return true; // Indicate the food was eaten
    }
    return false;
  };

  const checkCollision = head => {
    // Check boundary collision
    var gO = false;
    gO = head.x >= 20 || head.x < 0 || head.y >= 20 || head.y < 0
   
    if (!gO) {
      // Check self collision
      for (const segment of snake) {
        gO = head.x === segment.x && head.y === segment.y
        if (gO) break;
      }
    }

    if (gO) {
      setGameOver(true); // Set game over state
    }
    
    return gO;
  };

  // Function to navigate back to the menu
  const backToMenu = () => {
    navigate('/menu'); // Replace '/menu' with the actual route to your Menu component
  };

  const GameOverModal = ({ show, onRestart, onBackToMenu }) => {
    if (!show) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Game Over</h2>
          <button onClick={onRestart}>Restart Game</button>
          <button onClick={onBackToMenu}>Back to Menu</button>
        </div>
      </div>
    );
  };

  
  const resetGame = () => {
    setSnake([{ x: 0, y: 0 }]); // Reset snake position
    setFood(getRandomCoordinates()); // Reposition food
    setDirection('RIGHT'); // Reset direction
    setGameOver(false); // Reset game over state
    setScore(0); // Reset score
  };

  const sendScoreToAPI = async () => {
    if (playerId) {
      try {
        const response = await fetch(`http://localhost:3001/players/${playerId}/scores`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ score }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error updating score:', error);
      }
    }
  };

  useEffect(() => {
    let gameLoop;
  
    if (!gameOver) {
      // Adjust the interval as per the snake speed setting
      gameLoop = setInterval(moveSnake, 200 / settings.snakeSpeed);
    }
  
    return () => {
      clearInterval(gameLoop);
    };
  }, [moveSnake, gameOver, settings.snakeSpeed]);  

  useEffect(() => {
    if (gameOver) {
      sendScoreToAPI();
    }
  }, [gameOver, sendScoreToAPI]);
  

  // Handle key press for snake direction
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.keyCode) {
        case 37: // Left arrow
          setDirection('LEFT');
          break;
        case 38: // Up arrow
          setDirection('UP');
          break;
        case 39: // Right arrow
          setDirection('RIGHT');
          break;
        case 40: // Down arrow
          setDirection('DOWN');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <div className="game-wrapper">
      <header className="game-header">
        <h1>Snake Game</h1>
        <div className="score-board">
          Score: {score}
        </div>
      </header>
      <div className="game-area" style={{ backgroundColor: settings.backgroundColor }}>
        {snake.map((segment, index) => (
          <div key={index} className="snake-segment" style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px`, backgroundColor: settings.snakeColor }} />
        ))}
        <div className="food" style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px`, backgroundColor: settings.foodColor }} />
      </div>
      <GameOverModal show={gameOver} onRestart={resetGame} onBackToMenu={backToMenu} />
      <footer className="game-footer">
        <button onClick={backToMenu} className="back-to-menu">Back to Menu</button>
      </footer>
    </div>
  );
};

export default Game;
