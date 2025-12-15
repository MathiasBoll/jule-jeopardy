import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchGameById } from "../../api/gameService";
import teamsImg from "../../assets/img/img_teams.png";
import BackButton from "../../components/ui/BackButton";
import Modal from "../../components/ui/Modal";
import Snowfall from "../../components/ui/Snowfall";
import { GameProvider, useGame } from "../../context/GameContext";
import "./GamePlayPage.css";
import JeopardyBoard from "./JeopardyBoard";
import TeamsDisplay from "./TeamsDisplay";

const GamePlayContent = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const gameId = searchParams.get("gameId");
  const gameFromState = location.state?.game;
  const { setCurrentGame, setTeams } = useGame();
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

        let game = gameFromState;
        if (!game) {
          game = await fetchGameById(gameId);
        }

        let teamsData = [];
        const storedTeams = sessionStorage.getItem("teams");

        if (storedTeams) {
          teamsData = JSON.parse(storedTeams).map((team, index) => ({
            ...team,
            id: team.id || index + 1,
            score: 0,
          }));
          localStorage.setItem("gameTeams", JSON.stringify(teamsData));
          sessionStorage.removeItem("teams");
        } else {
          const storedGameTeams = localStorage.getItem("gameTeams");
          if (storedGameTeams) {
            teamsData = JSON.parse(storedGameTeams);
          } else {
            teamsData = [{ id: 1, name: "Hold 1", score: 0 }];
            localStorage.setItem("gameTeams", JSON.stringify(teamsData));
          }
        }

        if (!game) {
          setError("Game not found");
          setLoading(false);
          return;
        }

        setCurrentGame(game);
        setTeams(teamsData);
        setLoading(false);
      } catch (err) {
        console.error("GamePlayPage - Error:", err);
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
    <div className="gamePageContainer">
      <img
        src={teamsImg}
        alt="Background decoration"
        className="hero-background"
      />
      <Snowfall />
      <BackButton to="/game-select" />
      <JeopardyBoard />
      <TeamsDisplay />
      <Modal />
    </div>
  );
};

const GamePlayPage = () => {
  return (
    <GameProvider>
      <GamePlayContent />
    </GameProvider>
  );
};

export default GamePlayPage;
