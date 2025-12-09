import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchGameById } from "../../api/gameService";
import { fetchTeams } from "../../api/teamService";
import GameBoard from "../../components/game/GameBoard";
import Modal from "../../components/ui/Modal";
import { GameProvider, useGame } from "../../context/GameContext";
import "./GameBoardPage.css";

const GameBoardContent = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const gameId = searchParams.get("gameId");
  const gameFromState = location.state?.game;
  const { setCurrentGame, teams, setTeams } = useGame();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameData = async () => {
      try {
        if (!gameId) {
          setError("No game ID provided");
          setLoading(false);
          return;
        }

        console.log("Fetching game with ID:", gameId);
        console.log("Game from state:", gameFromState);

        // If we have the game from navigation state, use it directly
        let game = gameFromState;

        // Only fetch if we don't have the game data
        if (!game) {
          game = await fetchGameById(gameId);
          console.log("Fetched game from API:", game);
        }

        const teamsData = await fetchTeams();
        console.log("Fetched teams:", teamsData);

        if (!game) {
          setError("Game not found");
          setLoading(false);
          return;
        }

        setCurrentGame(game);
        setTeams(teamsData.map((team) => ({ ...team, score: 0 })));
        setLoading(false);
      } catch (err) {
        console.error("Error loading game:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadGameData();
  }, [gameId, gameFromState, setCurrentGame, setTeams]);

  if (loading) {
    return <div className="loading">Loading game...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error Loading Game</h2>
        <p>{error}</p>
        <p>Game ID: {gameId}</p>
        <button onClick={() => (window.location.href = "/game-select")}>
          Back to Game Selection
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <GameBoard />
      <TeamsDisplay teams={teams} />
      <Modal />
    </div>
  );
};

const TeamsDisplay = ({ teams }) => {
  if (!teams || teams.length === 0) return null;

  return (
    <div className="teamsContainer">
      {teams.map((team) => (
        <div key={team._id} className="teamCard">
          <div className="teamName">{team.name}</div>
          <div className="teamScore">{team.score || 0}</div>
        </div>
      ))}
    </div>
  );
};

const GameBoardPage = () => {
  return (
    <GameProvider>
      <GameBoardContent />
    </GameProvider>
  );
};

export default GameBoardPage;
