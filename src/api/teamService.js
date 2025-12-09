const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTeams = async () => {
  try {
    const res = await fetch(`${API_URL}/teams`);
    if (!res.ok) throw new Error("Failed to fetch teams");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
};
