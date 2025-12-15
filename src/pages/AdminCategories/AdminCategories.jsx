import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../../api/gameService";

import heroImg from "../../assets/img/hero_img.png";
import BackButton from "../../components/ui/BackButton";
import s from "./AdminCategories.module.css";
import CategoriesTable from "./CategoriesTable";

const AdminCategories = ({ game: gameProp }) => {
  const { gameId } = useParams();
  const [game, setGame] = useState(gameProp || null);
  const [loading, setLoading] = useState(!gameProp && !!gameId);

  useEffect(() => {
    if (gameProp) {
      setGame(gameProp);
      return;
    }

    if (gameId) {
      const loadGame = async () => {
        try {
          const data = await fetchGameById(gameId);
          setGame(data);
        } catch (err) {
          console.error("Failed to fetch game:", err);
        } finally {
          setLoading(false);
        }
      };
      loadGame();
    }
  }, [gameId, gameProp]);

  if (loading) {
    return (
      <div className={s.pageContainer}>
        <img src={heroImg} alt="" className={s.heroBackground} />
        <p className={s.statusText}>Indlæser...</p>
      </div>
    );
  }

  return (
    <div className={s.pageContainer}>
      <img src={heroImg} alt="" className={s.heroBackground} />
      <BackButton to="/admin" />

      <div className={s.contentWrapper}>
        <h1 className={s.pageTitle}>Kategorier</h1>
        <p className={s.pageSubtitle}>{game?.name}</p>
        <div className={s.tableBox}>
          <CategoriesTable game={game} />
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
