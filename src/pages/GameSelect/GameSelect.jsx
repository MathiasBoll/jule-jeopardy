import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchGame from "../CMS/FetchGame";
import s from "./GameSelect.module.css";

const GameSelect = () => {
  const { games, loading, error } = FetchGame();
  const [selectedGameId, setSelectedGameId] = useState("");
  const navigate = useNavigate();

  const selectedGame = games.find((g) => g._id === selectedGameId);

  const handleNext = () => {
    if (selectedGame) {
      navigate("/game-play", { state: selectedGame });
    }
  };

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={s.btnContainer}>
      <select
        className={s.select}
        value={selectedGameId}
        onChange={(e) => setSelectedGameId(e.target.value)}
      >
        <option value="">-- Select a Game --</option>
        {games.map((game) => (
          <option key={game._id} value={game._id}>
            {game.name}
          </option>
        ))}
      </select>

      <button className={s.btn} onClick={handleNext} disabled={!selectedGame}>
        Next / Play
      </button>
    </div>
  );
};

export default GameSelect;
