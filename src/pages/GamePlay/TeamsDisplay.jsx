import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";

const iconMap = {
  star: "/src/assets/icon/star_yellow.svg",
  tree: "/src/assets/icon/tree.svg",
  snowflake: "/src/assets/icon/snowflake.svg",
  gift: "/src/assets/icon/gift.svg",
  bell: "/src/assets/icon/bell.svg",
  ornament: "/src/assets/icon/ornament.svg",
};

const TeamsDisplay = () => {
  const navigate = useNavigate();
  const { teams, updateTeamScore, lastQuestionValue } = useGame();

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

export default TeamsDisplay;
