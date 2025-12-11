// API URL til Jeopardy backend
const API_URL = "https://jeopardy-gkiyb.ondigitalocean.app";

// Henter alle hold fra API'en
export const fetchTeams = async () => {
  const response = await fetch(`${API_URL}/teams`);
  const data = await response.json();
  return data.data || [];
};

// Henter liste over tilgængelige hold-billeder
export const fetchTeamImages = async () => {
  const response = await fetch(`${API_URL}/teams/images`);
  const data = await response.json();
  return data.data || [];
};

// Opretter et nyt hold i API'en
export const createTeam = async (teamData) => {
  const response = await fetch(`${API_URL}/team`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teamData),
  });
  return await response.json();
};

// Opdaterer et eksisterende hold
export const updateTeam = async (teamData) => {
  const response = await fetch(`${API_URL}/team`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teamData),
  });
  return await response.json();
};

// Sletter et hold baseret på ID
export const deleteTeam = async (teamId) => {
  const response = await fetch(`${API_URL}/team/${teamId}`, {
    method: "DELETE",
  });
  return await response.json();
};

// Opdaterer et holds score
export const updateTeamScore = async (teamId, score) => {
  const response = await fetch(`${API_URL}/team/${teamId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score }),
  });
  return await response.json();
};
