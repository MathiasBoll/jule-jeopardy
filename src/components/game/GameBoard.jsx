import { useGame } from "../../context/GameContext";
import CategoryColumn from "./CategoryColumn";
import s from "./GameBoard.module.css";

const GameBoard = () => {
  const { currentGame } = useGame();

  if (!currentGame || !currentGame.categories) {
    return <div>No game loaded</div>;
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>{currentGame.name}</h1>
      <div className={s.grid}>
        {currentGame.categories.map((category) => (
          <CategoryColumn key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
