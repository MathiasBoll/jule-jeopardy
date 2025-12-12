import { useLocation, useNavigate } from "react-router-dom";
import heroImg from "../../assets/img/hero_img.png";
import CountUp from "../../components/ui/CountUp";
import "./Podium.css";

// Podium-siden - viser vinderne efter spillet er slut
const Podium = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Henter holddata fra navigation state
  const teams = location.state?.teams || [];

  // Mapping af ikon-navne til filstier
  const iconMap = {
    star: "/src/assets/icon/star_yellow.svg",
    tree: "/src/assets/icon/tree.svg",
    snowflake: "/src/assets/icon/snowflake.svg",
    gift: "/src/assets/icon/gift.svg",
    bell: "/src/assets/icon/bell.svg",
    ornament: "/src/assets/icon/ornament.svg",
  };

  // Sorterer hold efter score (højeste først)
  const sortedTeams = [...teams].sort(
    (a, b) => (b.score || 0) - (a.score || 0)
  );

  // Henter top 3 til podiet
  const podiumTeams = sortedTeams.slice(0, 3);
  // Resterende hold vises i tabel
  const remainingTeams = sortedTeams.slice(3);

  // Podium-rækkefølge (2., 1., 3. visuelt)
  const podiumOrder =
    podiumTeams.length >= 3
      ? [podiumTeams[1], podiumTeams[0], podiumTeams[2]]
      : podiumTeams.length === 2
      ? [podiumTeams[1], podiumTeams[0]]
      : podiumTeams;

  // Navigerer til spilvalg for at spille igen
  const handlePlayAgain = () => {
    navigate("/game-select");
  };

  // Navigerer tilbage til forsiden
  const handleBackToMenu = () => {
    navigate("/home");
  };

  // Returnerer CSS-klasse baseret på podium-position
  const getPodiumClass = (index) => {
    if (podiumTeams.length >= 3) {
      return index === 0 ? "second" : index === 1 ? "first" : "third";
    } else if (podiumTeams.length === 2) {
      return index === 0 ? "second" : "first";
    } else {
      return "first";
    }
  };

  // Returnerer placeringstal baseret på index
  const getPodiumPosition = (index) => {
    if (podiumTeams.length >= 3) {
      return index === 0 ? 2 : index === 1 ? 1 : 3;
    } else if (podiumTeams.length === 2) {
      return index === 0 ? 2 : 1;
    } else {
      return 1;
    }
  };

  return (
    <div className="podium-container">
      <img
        src={heroImg}
        alt="Background decoration"
        className="podium-hero-background"
      />
      {/* Indicator lights */}
      <div className="podium-lights">
        <div className="light red" />
        <div className="light yellow" />
        <div className="light green" />
      </div>

      {/* Winner card */}
      <div className="winner-card">
        <div className="winner-stars">
          <span className="star">⭐</span>
          <span className="star">⭐</span>
          <span className="star">⭐</span>
        </div>
        <h1 className="winner-title">Vindere af Jule Jeopardy!</h1>
        <p className="winner-subtitle">Tillykke til top 3-holdene</p>
        <div className="winner-stars">
          <span className="star">⭐</span>
          <span className="star">⭐</span>
          <span className="star">⭐</span>
        </div>

        {/* Podium Display (Grouped Columns) */}
        <div className="podium-display">
          {podiumOrder.map((team, index) => {
            const position = getPodiumPosition(index);
            const podiumClass = getPodiumClass(index);

            return team ? (
              <div key={team.id} className={`podium-column ${podiumClass}`}>
                {/* Circle/Avatar Section */}
                <div className={`circle-container ${podiumClass}`}>
                  <div className="team-circle">
                    {team.icon && (
                      <div
                        className={`team-icon-circle ${team.color || "yellow"}`}
                      >
                        <img
                          src={iconMap[team.icon]}
                          alt={team.icon}
                          className="podium-team-icon"
                        />
                      </div>
                    )}
                  </div>
                  <div className="team-info">
                    <div className="team-name-label">{team.name}</div>
                    <div className="team-score-label">
                      <CountUp
                        end={team.score || 0}
                        delay={index === 0 ? 0.3 : index === 1 ? 0.7 : 0.5}
                      />{" "}
                      point
                    </div>
                  </div>
                </div>

                {/* Platform Section */}
                <div className={`platform ${podiumClass}`}>
                  <div className="trophy-icon">🏆</div>
                  <div className="platform-number">{position}</div>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>

      {/* Remaining teams table */}
      {remainingTeams.length > 0 && (
        <div className="remaining-teams">
          <table className="teams-table">
            <thead>
              <tr>
                <th>Placering</th>
                <th>Holdnavn</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              {remainingTeams.map((team, index) => {
                const position = index + 4;
                return (
                  <tr key={team.id}>
                    <td>{position}</td>
                    <td>
                      <div className="table-team">
                        {team.icon && (
                          <div
                            className={`table-team-circle ${
                              team.color || "yellow"
                            }`}
                          >
                            <img
                              src={iconMap[team.icon]}
                              alt={team.icon}
                              className="table-team-icon"
                            />
                          </div>
                        )}
                        <span className="table-team-name">{team.name}</span>
                      </div>
                    </td>
                    <td>{team.score || 0} point</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Action buttons */}
      <div className="podium-actions">
        <button className="btn-play-again" onClick={handlePlayAgain}>
          🎮 Spil igen
        </button>
        <button className="btn-back-menu" onClick={handleBackToMenu}>
          Tilbage til menu
        </button>
      </div>

      {/* Bottom indicator lights */}
      <div className="bottom-lights">
        <div className="light green" />
        <div className="light yellow" />
        <div className="light red" />
      </div>
    </div>
  );
};

export default Podium;
