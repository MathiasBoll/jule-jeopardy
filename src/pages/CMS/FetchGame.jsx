// src/hooks/FetchGame.jsx
// Custom React hook til at hente alle spil fra API'et
// Bruges til at centralisere fetch-logik og genbruges i flere komponenter
// Returnerer både data, loading-state og fejlbesked

import { useEffect, useState } from "react";
import { fetchGames } from "../../api/gameService";

// FetchGame
// Denne hook:
// - henter alle games fra API'et når komponenten mountes
// - håndterer loading-state
// - håndterer fejl
const FetchGame = () => {
  // Liste over spil fra API'et
  const [games, setGames] = useState([]);

  // True mens data hentes
  const [loading, setLoading] = useState(true);

  // Fejlbesked hvis fetch fejler
  const [error, setError] = useState(null);

  useEffect(() => {
    // Asynkron funktion til at hente spil
    const loadGames = async () => {
      try {
        // Henter spil via gameService
        const data = await fetchGames();

        // Gemmer spillene i state
        setGames(data);
      } catch (err) {
        // Hvis noget går galt, gemmes fejlen
        setError(err.message);
      } finally {
        // Stop loading uanset om det lykkes eller fejler
        setLoading(false);
      }
    };

    // Kald funktionen når komponenten mountes
    loadGames();
  }, []);

  // Returnerer state til den komponent der bruger hooken
  return { games, loading, error };
};

// Eksporter hooken så den kan bruges i fx dashboards, dropdowns osv.
export default FetchGame;
