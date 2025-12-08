const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchGames = async () => {
  const res = await fetch(`${API_URL}/games`);
  if (!res.ok) throw new Error("Failed to fetch games");
  const data = await res.json();
  return data.data || [];
};

export const fetchGameById = async (gameId) => {
  const res = await fetch(`${API_URL}/games`);
  if (!res.ok) throw new Error("Failed to fetch games");
  const data = await res.json();
  return data.data.find((g) => g._id === gameId) || null;
};
