/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [lastQuestionValue, setLastQuestionValue] = useState(100);

  const markQuestionAsAnswered = (questionId) => {
    setAnsweredQuestions((prev) => [...prev, questionId]);
  };

  const updateTeamScore = (teamId, points) => {
    setTeams((prevTeams) => {
      const updatedTeams = prevTeams.map((team) =>
        team.id === teamId
          ? { ...team, score: (team.score || 0) + points }
          : team
      );
      // Save to localStorage
      localStorage.setItem("gameTeams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });
  };

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

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
