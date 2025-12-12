import { useEffect, useState } from "react";
import { fetchGameById } from "../../api/gameService";

const FetchGameById = (gameId) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    const loadGame = async () => {
      try {
        const data = await fetchGameById(gameId);
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [gameId]);

  return { game, loading, error };
};

export default FetchGameById;
