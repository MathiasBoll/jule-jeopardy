// src/components/GameSelect/GameSelect.jsx
// Komponent til at vælge hvilket spil der skal vises i admin-dashboardet
// Henter spil fra API via FetchGame og sender det valgte spil videre til parent

import React, { useState } from "react";
import FetchGame from "../CMS/FetchGame";
import s from "./GameSelect.module.css";

const TARGET_GAME_ID = "693bd83b4d6dcc5e58fa2aba";

// Props:
// - onSelect: callback-funktion der modtager det valgte spil-objekt
const GameSelect = ({ onSelect }) => {
  // Henter spil, loading-status og fejl fra custom hook
  const { games, loading, error } = FetchGame();

  const filteredGames = games.filter((g) => g._id === TARGET_GAME_ID);

  const [selectedGameId, setSelectedGameId] = useState(TARGET_GAME_ID);

  const selectedGame = filteredGames.find((g) => g._id === selectedGameId);

  // State til ID på det valgte spil fra dropdown
  const [selectedGameId, setSelectedGameId] = useState("");

  // Finder det fulde spil-objekt ud fra valgt ID
  const selectedGame = games.find((g) => g._id === selectedGameId);

  // Når brugeren klikker "View"
  // Sender det valgte spil op til parent-komponenten
  const handleNext = () => {
    if (selectedGame) {
      onSelect(selectedGame);
    }
  };

  // Vis loading-state mens spil hentes
  if (loading) return <p>Loading games...</p>;

  // Vis fejl hvis API-kald fejler
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={s.dashContainer}>
      {/* Titel for admin dashboard */}
      <h2 className={s.adminTitle}>Games Dash Board</h2>

      {/* Dropdown + knap */}
      <div className={s.btnContainer}>
        {/* Dropdown til valg af spil */}
        <select
          className={s.select}
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
        >
          <option value="">-- Select a Game --</option>
          {filteredGames.map((game) => (

          {/* Liste af spil hentet fra API */}
          {games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.name}
            </option>
          ))}
        </select>

        {/* Knap der aktiveres når et spil er valgt */}
        <button
          className={s.btn}
          onClick={handleNext}
          disabled={!selectedGame}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default GameSelect;
