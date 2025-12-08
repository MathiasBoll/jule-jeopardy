import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchGame from "../CMS/FetchGame";
import s from "./GameSelect.module.css";

const GameSelect = ({ onSelect }) => {
  const { games, loading, error } = FetchGame();
  const [selectedGameId, setSelectedGameId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const selectedGame = games.find((g) => g._id === selectedGameId);

  const handleNext = () => {
    if (selectedGame && selectedCategory) {
      const gameData = {
        ...selectedGame,
        selectedCategory,
      };
      onSelect(gameData);
      navigate("/game-play", { state: gameData });
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

      {selectedGame && (
        <select
          className={s.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Select a Game --</option>
          {selectedGame.categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      <button
        className={s.btn}
        onClick={handleNext}
        disabled={!selectedGame || !selectedCategory}
      >
        Next / Play
      </button>
    </div>
  );
};

export default GameSelect;
