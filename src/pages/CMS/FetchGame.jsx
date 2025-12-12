import { useEffect, useState } from "react";
import { fetchGames } from "../../api/gameService";

const CreateGameForm = (gameId) => {
  const [games, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [gameId]);

  return { games, loading, error };
};

export default FetchGame;
