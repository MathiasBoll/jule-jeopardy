// src/pages/AdminHome/AdminHome.jsx
import heroImg from "../../assets/img/hero_img.png";
import BackButton from "../../components/ui/BackButton";
import useFetchGames from "../../hooks/useFetchGames";
import s from "./AdminHome.module.css";

const TARGET_GAME_ID = "693bd83b4d6dcc5e58fa2aba";

const AdminHome = ({ onSelect }) => {
  const { games, loading, error } = useFetchGames();

  // Find the hardcoded game
  const targetGame = games.find((g) => g._id === TARGET_GAME_ID);

  const handleSelect = () => {
    if (targetGame) {
      onSelect(targetGame);
    }
  };

  if (loading) {
    return (
      <div className={s.pageContainer}>
        <img src={heroImg} alt="" className={s.heroBackground} />
        <div className={s.loadingContainer}>
          <p className={s.loadingText}>Indlæser spil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.pageContainer}>
        <img src={heroImg} alt="" className={s.heroBackground} />
        <div className={s.errorContainer}>
          <p className={s.errorText}>Fejl: {error}</p>
        </div>
      </div>
    );
  }

  if (!targetGame) {
    return (
      <div className={s.pageContainer}>
        <img src={heroImg} alt="" className={s.heroBackground} />
        <div className={s.errorContainer}>
          <p className={s.errorText}>Spil ikke fundet</p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.pageContainer}>
      <img src={heroImg} alt="" className={s.heroBackground} />
      <BackButton to="/home" />

      <div className={s.contentWrapper}>
        <div className={s.headerSection}>
          <h1 className={s.title}>Admin Dashboard</h1>
          <p className={s.subtitle}>Rediger spørgsmål og kategorier</p>
        </div>

        <div className={s.gameCard} onClick={handleSelect}>
          <div className={s.gameIcon}>🎄</div>
          <div className={s.gameInfo}>
            <h2 className={s.gameName}>{targetGame.name}</h2>
            <p className={s.gameStats}>
              {targetGame.categories?.length || 0} kategorier
            </p>
          </div>
          <div className={s.gameArrow}>→</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
