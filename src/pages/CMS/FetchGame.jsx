import { useEffect, useState } from "react";
import { fetchGames } from "../../api/gameService";

const FetchGame = () => {
  const [games, setGames] = useState([]);
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
    loadGames();
  }, []);

  return { games, loading, error };
};

export default FetchGame;
