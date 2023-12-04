import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [playerId, setPlayerId] = useState(null);
  const [settings, setSettings] = useState({
    snakeSpeed: 1,
    snakeColor: 'green',
    foodColor: 'red',
    backgroundColor: 'black',
  });

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <PlayerContext.Provider value={{ playerId, setPlayerId, settings, updateSettings }}>
      {children}
    </PlayerContext.Provider>
  );
};
