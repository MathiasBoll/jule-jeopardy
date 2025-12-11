import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGames } from "../../api/gameService";
import bauble1 from "../../assets/icon/bauble_1.svg";
import bauble2 from "../../assets/icon/bauble_2.svg";
import bauble3 from "../../assets/icon/bauble_3.svg";
import bellIcon from "../../assets/icon/bell.svg";
import giftIcon from "../../assets/icon/gift.svg";
import ornamentIcon from "../../assets/icon/ornament.svg";
import snowflakeIcon from "../../assets/icon/snowflake.svg";
import starIcon from "../../assets/icon/star_yellow.svg";
import treeIcon from "../../assets/icon/tree.svg";
import heroImg from "../../assets/img/hero_img.png";
import BackButton from "../../components/ui/BackButton";
import "./TeamSetup.css";

const TeamSetup = () => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState([
    { id: 1, name: "Hold 1", icon: "star", color: "yellow" },
    { id: 2, name: "Hold 2", icon: "tree", color: "green" },
  ]);
  const navigate = useNavigate();

  const iconOptions = [
    { name: "star", icon: starIcon, color: "yellow" },
    { name: "tree", icon: treeIcon, color: "green" },
    { name: "snowflake", icon: snowflakeIcon, color: "white" },
    { name: "gift", icon: giftIcon, color: "red" },
    { name: "bell", icon: bellIcon, color: "yellow" },
    { name: "ornament", icon: ornamentIcon, color: "red" },
  ];

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await fetchGames();
        console.log("TeamSetup - Loaded games:", gamesData);
        setGames(gamesData);
        if (gamesData.length > 0) {
          setSelectedGameId(gamesData[0]._id);
        }
      } catch (error) {
        console.error("Error loading games:", error);
      }
    };
    loadGames();
  }, []);

  const handleTeamCountChange = (increment) => {
    const newCount = Math.max(1, Math.min(6, teamCount + increment));
    setTeamCount(newCount);

    if (newCount > teams.length) {
      // Adding teams
      const newTeams = [...teams];
      for (let i = teams.length; i < newCount; i++) {
        newTeams.push({
          id: i + 1,
          name: `Hold ${i + 1}`,
          icon: iconOptions[i % iconOptions.length].name,
          color: iconOptions[i % iconOptions.length].color,
        });
      }
      setTeams(newTeams);
    } else if (newCount < teams.length) {
      // Removing teams
      setTeams(teams.slice(0, newCount));
    }
  };

  const handleTeamNameChange = (teamId, newName) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team
      )
    );
  };

  const handleIconSelect = (teamId, iconName, color) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, icon: iconName, color: color } : team
      )
    );
  };

  const handleStartGame = () => {
    if (selectedGameId) {
      const selectedGame = games.find((g) => g._id === selectedGameId);
      console.log("TeamSetup - Starting game:", selectedGame);
      console.log("TeamSetup - Teams being stored:", teams);

      // Clear old game data and store fresh teams
      localStorage.removeItem("gameTeams");
      sessionStorage.setItem("teams", JSON.stringify(teams));

      navigate(`/game-play?gameId=${selectedGameId}`, {
        state: { game: selectedGame },
      });
    }
  };

  return (
    <div className="team-setup-container">
      <BackButton to="/home" />
      <img
        src={heroImg}
        alt="Background decoration"
        className="teamsetup-hero-background"
      />

      <div className="baubles-decoration">
        <img src={bauble1} alt="" className="bauble-deco bauble-1" />
        <img src={bauble2} alt="" className="bauble-deco bauble-2" />
        <img src={bauble3} alt="" className="bauble-deco bauble-3" />
      </div>

      <div className="setup-content">
        <div className="header-section">
          <h1 className="title">Jule Jeopardy</h1>
          <h2 className="subtitle">En festlig quiz for hele familien</h2>
        </div>

        <div className="team-count-section">
          <h3 className="team-count-label">Hvor mange hold skal spille?</h3>
          <div className="team-counter">
            <button
              className="counter-btn minus"
              onClick={() => handleTeamCountChange(-1)}
              disabled={teamCount <= 1}
            >
              −
            </button>
            <div className="counter-display">{teamCount}</div>
            <button
              className="counter-btn plus"
              onClick={() => handleTeamCountChange(1)}
              disabled={teamCount >= 6}
            >
              +
            </button>
          </div>
        </div>

        <div className="teams-grid">
          {teams.map((team, index) => (
            <div key={team.id} className="team-card">
              <div className="team-number-badge">{index + 1}</div>

              <div className="team-icon-section">
                <div className={`main-icon-circle ${team.color}`}>
                  <img
                    src={
                      iconOptions.find((opt) => opt.name === team.icon)?.icon
                    }
                    alt={team.icon}
                    className="main-icon"
                  />
                </div>
                <p className="icon-label">Vælg ikon</p>
              </div>

              <div className="icon-selector">
                {iconOptions.map((iconOption) => (
                  <button
                    key={iconOption.name}
                    className={`icon-option ${
                      team.icon === iconOption.name ? "selected" : ""
                    } ${iconOption.color}`}
                    onClick={() =>
                      handleIconSelect(
                        team.id,
                        iconOption.name,
                        iconOption.color
                      )
                    }
                  >
                    <img
                      src={iconOption.icon}
                      alt={iconOption.name}
                      className="option-icon"
                    />
                  </button>
                ))}
              </div>

              <p className="holdnavn-label">Holdnavn</p>
              <input
                type="text"
                className="team-name-input"
                value={team.name}
                onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                placeholder={`Hold ${team.id}`}
              />
            </div>
          ))}
        </div>

        <div className="game-select-section">
          <h3 className="game-select-label">Vælg spil</h3>
          <select
            className="game-select-dropdown"
            value={selectedGameId || ""}
            onChange={(e) => setSelectedGameId(e.target.value)}
          >
            <option value="" disabled>
              -- Vælg et spil --
            </option>
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="start-game-btn"
          onClick={handleStartGame}
          disabled={!selectedGameId}
        >
          ✨ Start Spillet ✨
        </button>

        <div className="game-indicator">
          <div className="indicator-dot green" />
          <div className="indicator-dot yellow" />
          <div className="indicator-dot red" />
        </div>
      </div>
    </div>
  );
};

export default TeamSetup;
