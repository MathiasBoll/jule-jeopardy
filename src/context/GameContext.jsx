/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { updateTeamScore as updateTeamScoreAPI } from "../api/teamService";

// Opretter context til at dele spildata på tværs af komponenter
const GameContext = createContext();

// Provider-komponent der wrapper hele appen og giver adgang til spildata
export const GameProvider = ({ children }) => {
  // State til det aktuelle spil
  const [currentGame, setCurrentGame] = useState(null);
  // State til holdene i spillet
  const [teams, setTeams] = useState([]);
  // State til det valgte spørgsmål
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  // State til besvarede spørgsmål - hentes fra localStorage ved opstart
  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const saved = localStorage.getItem("answeredQuestions");
    return saved ? JSON.parse(saved) : [];
  });
  // State til værdien af det sidst besvarede spørgsmål
  const [lastQuestionValue, setLastQuestionValue] = useState(100);

  // Markerer et spørgsmål som besvaret og gemmer i localStorage
  const markQuestionAsAnswered = (questionId) => {
    setAnsweredQuestions((prev) => {
      const updated = [...prev, questionId];
      localStorage.setItem("answeredQuestions", JSON.stringify(updated));
      return updated;
    });
  };

  // Opdaterer et holds score og gemmer i localStorage + sender til API
  const updateTeamScore = (teamId, points) => {
    setTeams((prevTeams) => {
      const updatedTeams = prevTeams.map((team) => {
        if (team.id === teamId) {
          const newScore = (team.score || 0) + points;
          // Send score til API hvis holdet har et API-id
          if (team.apiId) {
            updateTeamScoreAPI(team.apiId, newScore).catch((err) =>
              console.log("Could not sync score to API:", err)
            );
          }
          return { ...team, score: newScore };
        }
        return team;
      });
      localStorage.setItem("gameTeams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });
  };

  // Værdierne der deles via context
  const value = {
    currentGame,
    setCurrentGame,
    teams,
    setTeams,
    selectedQuestion,
    setSelectedQuestion,
    answeredQuestions,
    markQuestionAsAnswered,
    updateTeamScore,
    lastQuestionValue,
    setLastQuestionValue,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Custom hook til at bruge GameContext
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
