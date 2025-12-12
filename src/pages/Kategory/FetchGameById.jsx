import { useEffect, useState } from "react";
import { fetchGameById } from "../../api/gameService";

/*
  FetchGameById (custom hook)
  ---------------------------
  En genbrugelig hook, der henter ét spil fra API'et ud fra et gameId.

  Ansvar:
  - Hente spil-data fra backend
  - Holde styr på loading- og error-state
  - Returnere data i et konsistent format

  Bruges fx i:
  - KategoryGameTable
  - GameBoard
  - Admin-sider hvor ét specifikt spil skal vises
*/
const FetchGameById = (gameId) => {
  // State til selve spillet
  const [game, setGame] = useState(null);

  // State til loading-status (bruges til loader/spinner)
  const [loading, setLoading] = useState(true);

  // State til fejlbeskeder fra API
  const [error, setError] = useState(null);

  /*
    useEffect kører:
    - når komponenten mountes
    - når gameId ændrer sig
  */
  useEffect(() => {
    // Hvis der ikke er noget gameId, skal vi ikke kalde API'et
    if (!gameId) return;

    // Async funktion der henter spillet
    const loadGame = async () => {
      try {
        // Hent spil fra API via service-lag
        const data = await fetchGameById(gameId);

        // Gem spillet i state
        setGame(data);
      } catch (err) {
        // Hvis noget går galt, gem fejlbesked
        setError(err.message);
      } finally {
        // Loading afsluttes uanset om det lykkes eller fejler
        setLoading(false);
      }
    };

    loadGame();
  }, [gameId]); // Kør igen hvis gameId ændrer sig

  // Returnerer state samlet (React hook-pattern)
  return { game, loading, error };
};

export default FetchGameById;
