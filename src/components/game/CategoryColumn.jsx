import { useGame } from "../../context/GameContext";
import s from "./CategoryColumn.module.css";
import QuestionTile from "./QuestionTile";

const CategoryColumn = ({ category }) => {
  const { answeredQuestions } = useGame();

  // Sort questions by value
  const sortedQuestions = [...category.questions].sort(
    (a, b) => a.value - b.value
  );

  return (
    <div className={s.column}>
      <div className={s.header}>{category.name}</div>
      {sortedQuestions.map((question) => (
        <QuestionTile
          key={question._id}
          question={question}
          isAnswered={answeredQuestions.includes(question._id)}
        />
      ))}
    </div>
  );
};

export default CategoryColumn;
