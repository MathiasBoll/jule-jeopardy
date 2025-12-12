import React, { useState } from "react";
import FetchGame from "../CMS/FetchGame";
import s from "./GameSelect.module.css";

const TARGET_GAME_ID = "693bd83b4d6dcc5e58fa2aba";

const GameSelect = ({ onSelect }) => {
  const { games, loading, error } = FetchGame();

  const filteredGames = games.filter((g) => g._id === TARGET_GAME_ID);

  const [selectedGameId, setSelectedGameId] = useState(TARGET_GAME_ID);

  const selectedGame = filteredGames.find((g) => g._id === selectedGameId);

  const handleNext = () => {
    if (selectedGame) {
      onSelect(selectedGame);
    }
  };

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={s.dashContainer}>
      <h2 className={s.adminTitle}>Games Dash Board</h2>
      <div className={s.btnContainer}>
        <select
          className={s.select}
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
        >
          <option value="">-- Select a Game --</option>
          {filteredGames.map((game) => (
            <option key={game._id} value={game._id}>
              {game.name}
            </option>
          ))}
        </select>
        <button className={s.btn} onClick={handleNext} disabled={!selectedGame}>
          View
        </button>
      </div>
    </div>
  );
};

export default GameSelect;
