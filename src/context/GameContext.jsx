import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const markQuestionAsAnswered = (questionId) => {
    setAnsweredQuestions((prev) => [...prev, questionId]);
  };

  const updateTeamScore = (teamId, points) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team._id === teamId
          ? { ...team, score: (team.score || 0) + points }
          : team
      )
    );
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
