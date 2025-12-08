import React, { useState } from "react";
import DashNav from "../DashNav/DashNav";
import GameSelect from "../GameSelect/GameSelect";
import GamesDashBoard from "../../components/GamesDashBoard/GamesDashBoard";
import GameKategoryTable from "./GameKategoryTable";

import s from "./DashBoard.module.css";

const GamesDashboard = () => {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <section className={`sectionAdmin`}>
      <div className={`admin-container`}>
        <aside className={`sidebar`}>
          <DashNav />
        </aside>
        <div className={`container `}>
          <h2 className={s.dashTitle}>Games Dash Board</h2>
          <div className={s.tableContainer}>
            <div className={s.selectItems}>
              {!currentGame ? (
                <GameSelect onSelect={setCurrentGame} />
              ) : (
                <GamesDashBoard game={currentGame} />
              )}
            </div>
            <GameKategoryTable />
      
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesDashboard;
