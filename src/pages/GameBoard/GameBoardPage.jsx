import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchGameById } from "../../api/gameService";
import teamsImg from "../../assets/img/img_teams.png";
import GameBoard from "../../components/game/GameBoard";
import BackButton from "../../components/ui/BackButton";
import Modal from "../../components/ui/Modal";
import Snowfall from "../../components/ui/Snowfall";
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

        // Load teams - always prioritize sessionStorage (fresh from TeamSetup)
        let teamsData = [];
        const storedTeams = sessionStorage.getItem("teams");

        if (storedTeams) {
          // Fresh teams from TeamSetup - clear old data and use these
          teamsData = JSON.parse(storedTeams).map((team, index) => ({
            ...team,
            id: team.id || index + 1,
            score: 0,
          }));
          localStorage.setItem("gameTeams", JSON.stringify(teamsData));
          sessionStorage.removeItem("teams");
          console.log("GameBoardPage - Fresh teams from TeamSetup:", teamsData);
        } else {
          // No fresh teams, check localStorage for ongoing game
          const storedGameTeams = localStorage.getItem("gameTeams");
          if (storedGameTeams) {
            teamsData = JSON.parse(storedGameTeams);
            console.log("GameBoardPage - Teams from localStorage:", teamsData);
          } else {
            console.log("GameBoardPage - No teams found, using default");
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
    <div className="gamePageContainer">
      <img
        src={teamsImg}
        alt="Background decoration"
        className="hero-background"
      />
      <Snowfall />
      <BackButton to="/game-select" />
      <GameBoard />
      <TeamsDisplay teams={teams} />
      <Modal />
    </div>
  );
};

const TeamsDisplay = ({ teams }) => {
  const navigate = useNavigate();
  const { updateTeamScore, lastQuestionValue } = useGame();

  // Import icon images
  const iconMap = {
    star: "/src/assets/icon/star_yellow.svg",
    tree: "/src/assets/icon/tree.svg",
    snowflake: "/src/assets/icon/snowflake.svg",
    gift: "/src/assets/icon/gift.svg",
    bell: "/src/assets/icon/bell.svg",
    ornament: "/src/assets/icon/ornament.svg",
  };

  const handleShowPodium = () => {
    navigate("/podium", { state: { teams } });
  };

  const handleAddPoints = (teamId) => {
    updateTeamScore(teamId, lastQuestionValue);
  };

  const handleSubtractPoints = (teamId) => {
    updateTeamScore(teamId, -lastQuestionValue);
  };

  if (!teams || teams.length === 0) return null;

  return (
    <div className="teamsContainer">
      {teams.map((team) => (
        <div key={team.id} className="teamCard">
          {team.icon && (
            <div className={`teamIconCircle ${team.color || "yellow"}`}>
              <img
                src={iconMap[team.icon]}
                alt={team.icon}
                className="teamIconImg"
              />
            </div>
          )}
          <div className="teamName">{team.name}</div>
          <div className="teamScore">{team.score || 0}</div>
          <div className="scoreButtons">
            <button
              onClick={() => handleSubtractPoints(team.id)}
              className="scoreBtn minusBtn"
            >
              −
            </button>
            <button
              onClick={() => handleAddPoints(team.id)}
              className="scoreBtn plusBtn"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <button className="podium-button" onClick={handleShowPodium}>
        <div className="podium-text">
          <span>P</span>
          <span>O</span>
          <span>D</span>
          <span>I</span>
          <span>U</span>
          <span>M</span>
        </div>
        <div className="podium-arrow">›</div>
      </button>
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
