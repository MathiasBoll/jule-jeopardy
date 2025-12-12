import React, { useState } from "react";
import GameSelect from "../GameSelect/GameSelect";
import GameTable from "../GameTable/GameTable";

const GamesDashboard = () => {
  const [currentGame, setCurrentGame] = useState(null);
  console.log(currentGame);

  return (
    <section className="sectionAdmin">
      <div className="container">
        {!currentGame ? (
          <GameSelect onSelect={setCurrentGame} />
        ) : (
          <GameTable game={currentGame} />
        )}
      </div>
    </section>
  );
};

export default GamesDashboard;
