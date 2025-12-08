import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchGameById } from "../../api/gameService";
import { fetchTeams } from "../../api/teamService";
import GameBoard from "../../components/game/GameBoard";
import Modal from "../../components/ui/Modal";
import { GameProvider, useGame } from "../../context/GameContext";
import "./GameBoardPage.css";

const GameBoardContent = () => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");
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

        const [game, teamsData] = await Promise.all([
          fetchGameById(gameId),
          fetchTeams(),
        ]);

        if (!game) {
          setError("Game not found");
          setLoading(false);
          return;
        }

        setCurrentGame(game);
        setTeams(teamsData.map((team) => ({ ...team, score: 0 })));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadGameData();
  }, [gameId, setCurrentGame, setTeams]);

  if (loading) {
    return <div className="loading">Loading game...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
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
