import React from "react";
import Menu from "./components/Menu";
import EnterCredentials from "./components/EnterCredentials";
import Game from "./components/Game";
import Settings from "./components/Settings";
import Leaderboard from "./components/Leaderboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from './PlayerContext';

function App() {

  return (
    <Router>
      <PlayerProvider>
        <Routes>
          <Route path="/" element={<EnterCredentials />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/play" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </PlayerProvider>
    </Router>
  );
}

export default App;
