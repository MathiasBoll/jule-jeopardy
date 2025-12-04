const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetchData = async (endpoint) => {
  const res = await fetch(`${API_URL}/${endpoint}`);
  if (!res.ok) throw new Error(`Error fetching ${endpoint}`);
  const data = await res.json();
  return data.data || [];
};

export const fetchStays = () => fetchData("games");
