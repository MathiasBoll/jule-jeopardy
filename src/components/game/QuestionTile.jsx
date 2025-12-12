import { useGame } from "../../context/GameContext";
import s from "./QuestionTile.module.css";

// En spørgsmåls-knap på spillepladen - viser pointværdi
const QuestionTile = ({ question, isAnswered }) => {
  const { setSelectedQuestion, setLastQuestionValue } = useGame();

  // Håndterer klik på spørgsmål - åbner modal med spørgsmålet
  const handleClick = () => {
    if (!isAnswered) {
      setSelectedQuestion(question);
      setLastQuestionValue(question.value);
    }
  };

  return (
    <button onClick={handleClick} disabled={isAnswered} className={s.tile}>
      {question.value}
    </button>
  );
};

export default QuestionTile;
