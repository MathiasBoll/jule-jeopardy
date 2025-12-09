const API_URL = import.meta.env.VITE_API_BASE_URL || "";

const buildUrl = (path) => (API_URL ? `${API_URL}${path}` : path);

const ensureJson = async (res) => {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON response but got: ${text.slice(0, 200)}`);
  }
};

export const fetchGames = async () => {
  const res = await fetch(buildUrl("/games"), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok)
    throw new Error(`Failed to fetch games: ${res.status} ${res.statusText}`);
  await ensureJson(res);
  const data = await res.json();
  return data.data || [];
};

export const fetchGameById = async (gameId) => {
  if (!gameId) return null;
  const res = await fetch(buildUrl(`/games/${gameId}`), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok)
    throw new Error(
      `Failed to fetch game ${gameId}: ${res.status} ${res.statusText}`
    );
  await ensureJson(res);
  const data = await res.json();
  return data.data || null;
};
