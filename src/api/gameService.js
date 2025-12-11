const API_URL = "https://jeopardy-gkiyb.ondigitalocean.app";

// Games
export const fetchGames = async () => {
  const response = await fetch(`${API_URL}/games`);
  const data = await response.json();
  return data.data || [];
};

export const fetchGameById = async (gameId) => {
  if (!gameId) return null;
  const response = await fetch(`${API_URL}/game/${gameId}`);
  const data = await response.json();
  return data.data || null;
};

export const createGame = async (gameData) => {
  const response = await fetch(`${API_URL}/game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData),
  });
  return await response.json();
};

export const updateGame = async (gameData) => {
  const response = await fetch(`${API_URL}/game`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameData),
  });
  return await response.json();
};

export const deleteGame = async (gameId) => {
  const response = await fetch(`${API_URL}/game/${gameId}`, {
    method: "DELETE",
  });
  return await response.json();
};

export const addTeamsToGame = async (gameId, teamIds) => {
  const response = await fetch(`${API_URL}/game/${gameId}/add-teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teams: teamIds }),
  });
  return await response.json();
};
