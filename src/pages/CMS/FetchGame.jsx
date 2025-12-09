import React, { useState, useEffect } from "react";

const CreateGameForm = () => {
  const [games, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/games`);
        if (!res.ok) throw new Error("Failed to fetch game");
        const data = await res.json();
        setGame(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return { games, loading, error };
};

export default CreateGameForm;
