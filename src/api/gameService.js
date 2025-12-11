// API URL til Jeopardy backend
const API_URL = "https://jeopardy-gkiyb.ondigitalocean.app";

// Henter alle spil fra API'en
export const fetchGames = async () => {
  const response = await fetch(`${API_URL}/games`);
  const data = await response.json();
  return data.data || [];
};

// Henter et specifikt spil baseret på ID
export const fetchGameById = async (gameId) => {
  if (!gameId) return null;
  const response = await fetch(`${API_URL}/game/${gameId}`);
  const data = await response.json();
  return data.data || null;
};

// Opretter et nyt spil i API'en
export const createGame = async (gameData) => {
  const response = await fetch(`${API_URL}/game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData),
  });
  return await response.json();
};

// Opdaterer et eksisterende spil
export const updateGame = async (gameData) => {
  const response = await fetch(`${API_URL}/game`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData),
  });
  return await response.json();
};

// Sletter et spil baseret på ID
export const deleteGame = async (gameId) => {
  const response = await fetch(`${API_URL}/game/${gameId}`, {
    method: "DELETE",
  });
  return await response.json();
};

// Tilføjer hold til et spil
export const addTeamsToGame = async (gameId, teamIds) => {
  const response = await fetch(`${API_URL}/game/${gameId}/add-teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teams: teamIds }),
  });
  return await response.json();
};
