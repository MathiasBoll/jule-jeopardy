import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchGameById } from "../../api/gameService";
import { fetchTeams } from "../../api/teamService";
import GameBoard from "../../components/game/GameBoard";
import BackButton from "../../components/ui/BackButton";
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

        console.log("GameBoardPage - Game ID:", gameId);
        console.log("GameBoardPage - Game from state:", gameFromState);

        // Use game from state if available, otherwise fetch from API
        let game = gameFromState;

        if (!game) {
          console.log("GameBoardPage - No game in state, fetching from API...");
          game = await fetchGameById(gameId);
          console.log("GameBoardPage - Fetched game:", game);
        } else {
          console.log("GameBoardPage - Using game from navigation state");
        }

        // Fetch teams
        const teamsData = await fetchTeams();
        console.log("GameBoardPage - Teams:", teamsData);

        if (!game) {
          setError("Game not found");
          setLoading(false);
          return;
        }

        setCurrentGame(game);
        setTeams(teamsData.map((team) => ({ ...team, score: 0 })));
        setLoading(false);
      } catch (err) {
        console.error("GameBoardPage - Error:", err);
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
      <BackButton to="/game-select" />
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
