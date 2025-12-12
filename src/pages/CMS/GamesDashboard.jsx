import React, { useState } from "react";
import GameSelect from "../GameSelect/GameSelect";
import GameTable from "../GameTable/GameTable";
import DashNav from "../DashNav/DashNav";

const GamesDashboard = () => {
  const [currentGame, setCurrentGame] = useState(null);
  console.log(currentGame);

  return (
    <section className="sectionAdmin">
      <div className="container">
        <DashNav />
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
