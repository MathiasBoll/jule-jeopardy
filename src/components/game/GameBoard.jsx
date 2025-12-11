import { useGame } from "../../context/GameContext";
import CategoryColumn from "./CategoryColumn";
import s from "./GameBoard.module.css";

// Spillepladen - viser kategorier og spørgsmål i et grid
const GameBoard = () => {
  // Henter det aktuelle spil fra context
  const { currentGame } = useGame();

  console.log("GameBoard currentGame:", currentGame);

  // Viser besked hvis intet spil er indlæst
  if (!currentGame) {
    return <div className={s.container}>No game loaded</div>;
  }

  // Viser besked hvis spillet ikke har kategorier
  if (!currentGame.categories || currentGame.categories.length === 0) {
    return (
      <div className={s.container}>
        <h1 className={s.title}>{currentGame.name}</h1>
        <div>No categories found in this game</div>
      </div>
    );
  }

  // Renderer spillepladen med alle kategorier
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
