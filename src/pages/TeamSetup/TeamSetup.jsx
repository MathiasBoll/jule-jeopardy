// src/pages/TeamSetup/TeamSetup.jsx
// Side hvor man opsætter hold før Jeopardy-spillet starter
// Brugeren vælger antal hold, holdnavne og ikoner
// Spillet må IKKE starte, hvis et hold mangler navn

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// API-funktioner
import { addTeamsToGame, fetchGameById } from "../../api/gameService";
import { createTeam, deleteTeam, fetchTeamImages } from "../../api/teamService";
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

// UI komponenter
import BackButton from "../../components/ui/BackButton";

// Styling
import "./TeamSetup.css";

// ID på spillet (hardcoded fra API)
const GAME_ID = "693aab5197124700f6901873";

const TeamSetup = () => {
  // -----------------------------
  // STATE
  // -----------------------------

  // Spildata fra API
  const [game, setGame] = useState(null);

  // Antal hold (1–6)
  const [teamCount, setTeamCount] = useState(2);

  // Holdenes data
  const [teams, setTeams] = useState([
    { name: "", icon: "star", color: "yellow" },
    { name: "", icon: "tree", color: "green" },
  ]);

  // Fejlbesked hvis noget er galt
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  // -----------------------------
  // IKONER TIL HOLD
  // -----------------------------
  const iconOptions = [
    { name: "star", icon: starIcon, color: "yellow" },
    { name: "tree", icon: treeIcon, color: "green" },
    { name: "snowflake", icon: snowflakeIcon, color: "white" },
    { name: "gift", icon: giftIcon, color: "red" },
    { name: "bell", icon: bellIcon, color: "yellow" },
    { name: "ornament", icon: ornamentIcon, color: "red" },
  ];

  // -----------------------------
  // HENT SPIL FRA API VED LOAD
  // -----------------------------
  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameData = await fetchGameById(GAME_ID);
        setGame(gameData);
      } catch (error) {
        console.error("Error loading game:", error);
      }
    };

    loadGame();
  }, []);

  // -----------------------------
  // ÆNDR ANTAL HOLD
  // -----------------------------
  const handleTeamCountChange = (increment) => {
    const newCount = Math.max(1, Math.min(6, teamCount + increment));
    setTeamCount(newCount);

    // Hvis vi skal have flere hold
    if (newCount > teams.length) {
      const newTeams = [...teams];
      for (let i = teams.length; i < newCount; i++) {
        newTeams.push({
          name: "",
          icon: iconOptions[i % iconOptions.length].name,
          color: iconOptions[i % iconOptions.length].color,
        });
      }
      setTeams(newTeams);
    }

    // Hvis vi skal have færre hold
    if (newCount < teams.length) {
      setTeams(teams.slice(0, newCount));
    }
  };

  // -----------------------------
  // OPDATER HOLDNAVN
  // -----------------------------
  const handleTeamNameChange = (index, newName) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = { ...updatedTeams[index], name: newName };
    setTeams(updatedTeams);
  };

  // -----------------------------
  // VÆLG IKON
  // -----------------------------
  const handleIconSelect = (index, iconName, color) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = { ...updatedTeams[index], icon: iconName, color };
    setTeams(updatedTeams);
  };

  // -----------------------------
  // START SPIL
  // -----------------------------
  const handleStartGame = async () => {
    if (!game) return;

    // 🔴 VALIDATION: tjek om alle hold har navne
    const hasEmptyTeamNames = teams.some(
      (team) => !team.name || team.name.trim() === ""
    );

    if (hasEmptyTeamNames) {
      setFormError("Alle hold skal have et navn, før spillet kan starte.");
      return;
    }

    // Ryd evt. tidligere fejl
    setFormError(null);

    try {
      // Slet kun vores egne hold fra API'en (gemt i localStorage)
      const ourTeamIds = JSON.parse(localStorage.getItem("ourTeamIds") || "[]");
      for (const teamId of ourTeamIds) {
        try {
          await deleteTeam(teamId);
        } catch {
          // Team may already be deleted
        }
      }

      // Hent gyldige billede-URLs fra API'en
      let apiImages = [];
      try {
        apiImages = await fetchTeamImages();
      } catch {
        // Using default images
      }

      // Opret nye hold i API
      const createdTeamIds = [];
      const teamsWithApiIds = [];
      for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const imageUrl = apiImages[i % Math.max(apiImages.length, 1)] || "";
        // Brug default navn hvis feltet er tomt
        const teamName = team.name?.trim() || `Hold ${i + 1}`;
        const result = await createTeam({
          name: teamName,
          image: imageUrl,
        });
        if (result.data?._id) {
          createdTeamIds.push(result.data._id);
          // Gem API-id sammen med holddata så vi kan synce scores
          teamsWithApiIds.push({
            ...team,
            id: i + 1,
            apiId: result.data._id,
            score: 0,
          });
        }
      }

      // Gem vores hold-IDs så vi kun sletter dem næste gang
      localStorage.setItem("ourTeamIds", JSON.stringify(createdTeamIds));

      // Tilføj holdene til spillet (optional - game works without this)
      if (createdTeamIds.length > 0) {
        try {
          await addTeamsToGame(GAME_ID, createdTeamIds);
        } catch {
          // API endpoint may not be configured - game works without it
        }
      }

      // Ryd gamle spildata og gem de nye hold med API-ids
      localStorage.removeItem("gameTeams");
      localStorage.removeItem("answeredQuestions");
      sessionStorage.setItem("teams", JSON.stringify(teamsWithApiIds));

      // Gå til spillet
      navigate(`/game-play?gameId=${GAME_ID}`, {
        state: { game },
      });
    } catch (error) {
      console.error("Error starting game:", error);
      setFormError("Noget gik galt. Prøv igen.");
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------
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
            <div key={index} className="team-card">
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
                      handleIconSelect(index, iconOption.name, iconOption.color)
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
                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                placeholder="Skriv holdnavn"
              />
            </div>
          ))}
        </div>

        <div className="game-select-section">
          <h3 className="game-select-label">
            Spil: {game?.name || "Indlæser..."}
          </h3>
        </div>

        {/* 🔴 FEJLBESKED */}
        {formError && (
          <p className="teamsetup-error" role="alert">
            {formError}
          </p>
        )}

        <button
          className="start-game-btn"
          onClick={handleStartGame}
          disabled={!game}
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
