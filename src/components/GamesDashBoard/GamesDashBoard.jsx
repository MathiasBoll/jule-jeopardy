// src/pages/GamesDashBoard/GamesDashBoard.jsx
// Dashboard hvor man kan vælge hvilket Jeopardy-spil der skal startes
// Henter alle spil fra API og navigerer videre til selve spillet

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// API-kald til at hente alle spil
import { fetchGames } from "../../api/gameService";

// CSS module (lokal styling til komponenten)
import s from "./GamesDashBoard.module.css";

// Komponenten kan modtage et aktivt game som prop
const GamesDashBoard = ({ game }) => {
  // -----------------------------
  // STATE
  // -----------------------------

  // Liste over alle spil hentet fra API
  const [games, setGames] = useState([]);

  // Loader-state mens vi henter data
  const [loading, setLoading] = useState(true);

  // ID på det valgte spil (fra dropdown)
  // Hvis der allerede er et game som prop, bruges det som default
  const [selectedGameId, setSelectedGameId] = useState(game?._id || null);

  // React Router navigation
  const navigate = useNavigate();

  // -----------------------------
  // HENT SPIL FRA API VED LOAD
  // -----------------------------
  useEffect(() => {
    const loadGames = async () => {
      try {
        // Henter alle spil fra backend
        const gamesData = await fetchGames();
        console.log("Available games:", gamesData);

        // Gemmer spillene i state
        setGames(gamesData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading games:", error);
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // -----------------------------
  // HÅNDTER VALG AF SPIL
  // -----------------------------
  const handleGameSelect = (e) => {
    // Gemmer det valgte spil-id fra dropdown
    setSelectedGameId(e.target.value);
  };

  // -----------------------------
  // START VALGT SPIL
  // -----------------------------
  const handleStartGame = () => {
    if (selectedGameId) {
      console.log("Starting game with ID:", selectedGameId);

      // Finder hele game-objektet ud fra ID
      const selectedGame = games.find((g) => g._id === selectedGameId);
      console.log("Selected game object:", selectedGame);

      // Navigerer til spilsiden og sender spillet med som state
      navigate(`/game-play?gameId=${selectedGameId}`, {
        state: { game: selectedGame },
      });
    }
  };

  // -----------------------------
  // LOADING STATE
  // -----------------------------
  if (loading) return <div>Loading games...</div>;

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className={s.container}>
      {/* Titel */}
      <h2 className={s.title}>Select a Game to Play</h2>

      {/* Dropdown + start-knap */}
      <div className={s.selectContainer}>
        <label htmlFor="game-select" className={s.label}>
          Choose Game:
        </label>

        {/* Dropdown til valg af spil */}
        <select
          id="game-select"
          value={selectedGameId || ""}
          onChange={handleGameSelect}
          className={s.select}
        >
          <option value="">-- Select a game --</option>

          {/* Opret option for hvert spil */}
          {games.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Start-knap – deaktiveret hvis intet spil er valgt */}
        <button
          onClick={handleStartGame}
          disabled={!selectedGameId}
          className={s.startButton}
        >
          Start Game
        </button>
      </div>

      {/* Viser info om nuværende spil (hvis det er sendt som prop) */}
      {game && (
        <div className={s.gameInfo}>
          <h3 className={s.gameTitle}>Current Game: {game.name}</h3>

          {/* Viser spillets kategorier */}
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
