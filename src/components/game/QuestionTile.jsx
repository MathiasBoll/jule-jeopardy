import { useGame } from "../../context/GameContext";
import s from "./QuestionTile.module.css";

const QuestionTile = ({ question, isAnswered }) => {
  const { setSelectedQuestion } = useGame();

  const handleClick = () => {
    if (!isAnswered) {
      setSelectedQuestion(question);
    }
  };

  return (
    <button onClick={handleClick} disabled={isAnswered} className={s.tile}>
      {question.value}
    </button>
  );
};

export default QuestionTile;
