import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGames } from "../../api/gameService";
import s from "./GamesDashBoard.module.css";

const GamesDashBoard = ({ game }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGameId, setSelectedGameId] = useState(game?._id || null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await fetchGames();
        console.log("Available games:", gamesData);
        setGames(gamesData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading games:", error);
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  const handleGameSelect = (e) => {
    setSelectedGameId(e.target.value);
  };

  const handleStartGame = () => {
    if (selectedGameId) {
      console.log("Starting game with ID:", selectedGameId);
      const selectedGame = games.find((g) => g._id === selectedGameId);
      console.log("Selected game object:", selectedGame);
      navigate(`/game-play?gameId=${selectedGameId}`, {
        state: { game: selectedGame },
      });
    }
  };

  if (loading) return <div>Loading games...</div>;

  return (
    <div className={s.container}>
      <h2 className={s.title}>Select a Game to Play</h2>

      <div className={s.selectContainer}>
        <label htmlFor="game-select" className={s.label}>
          Choose Game:
        </label>
        <select
          id="game-select"
          value={selectedGameId || ""}
          onChange={handleGameSelect}
          className={s.select}
        >
          <option value="">-- Select a game --</option>
          {games.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleStartGame}
          disabled={!selectedGameId}
          className={s.startButton}
        >
          Start Game
        </button>
      </div>

      {game && (
        <div className={s.gameInfo}>
          <h3 className={s.gameTitle}>Current Game: {game.name}</h3>
          {game.categories && (
            <div>
              <h4 className={s.categoriesTitle}>Categories:</h4>
              <ul className={s.categoriesList}>
                {game.categories.map((cat) => (
                  <li key={cat._id}>{cat.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GamesDashBoard;
