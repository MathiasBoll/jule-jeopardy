import React, { useEffect, useState } from "react";

const FetchGameById = (gameId) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    const fetchGame = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/games`);
        if (!res.ok) throw new Error("Failed to fetch games");
        const data = await res.json();
        const selectGame = data.data.find((g) => g._id === gameId || null);

        setGame(selectGame);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [gameId]);
  return { game, loading, error };
};

export default FetchGameById;
