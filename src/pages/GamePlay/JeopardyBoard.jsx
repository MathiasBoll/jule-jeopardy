import { useGame } from "../../context/GameContext";
import CategoryColumn from "./CategoryColumn";
import s from "./JeopardyBoard.module.css";

const JeopardyBoard = () => {
  const { currentGame } = useGame();

  if (!currentGame) {
    return <div className={s.container}>No game loaded</div>;
  }

  if (!currentGame.categories || currentGame.categories.length === 0) {
    return (
      <div className={s.container}>
        <h1 className={s.title}>{currentGame.name}</h1>
        <div>No categories found in this game</div>
      </div>
    );
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

export default JeopardyBoard;
