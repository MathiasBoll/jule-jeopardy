// src/hooks/FetchGame.jsx
// Custom React hook til at hente alle spil fra API'et
// Returnerer data, loading-state og fejlbesked

import { useEffect, useState } from "react";
import { fetchGames } from "../../api/gameService";

const FetchGame = () => {
  const [games, setGames] = useState([]); // Liste over spil fra API
  const [loading, setLoading] = useState(true); // True mens data hentes
  const [error, setError] = useState(null); // Fejlbesked hvis fetch fejler

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames(); // Henter spil via gameService
        setGames(data); // Gemmer spillene i state
      } catch (err) {
        setError(err.message); // Gem fejl hvis fetch fejler
      } finally {
        setLoading(false); // Stop loading uanset resultat
      }
    };

    loadGames(); // Kald funktionen når komponenten mountes
  }, []);

  return { games, loading, error };
};

export default FetchGame;
