const API_URL = import.meta.env.VITE_API_BASE_URL || "";

const buildUrl = (endpoint) =>
  API_URL
    ? `${API_URL}/${endpoint.replace(/^\//, "")}`
    : `/${endpoint.replace(/^\//, "")}`;

const fetchData = async (endpoint) => {
  const res = await fetch(buildUrl(endpoint), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok)
    throw new Error(
      `Error fetching ${endpoint}: ${res.status} ${res.statusText}`
    );
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.data || [];
};

export const fetchStays = () => fetchData("games");
