import { useGame } from "../../context/GameContext";
import s from "./QuestionTile.module.css";

const QuestionTile = ({ question, isAnswered }) => {
  const { setSelectedQuestion, setLastQuestionValue } = useGame();

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
