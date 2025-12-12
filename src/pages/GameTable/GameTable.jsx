import React from "react";
import DashNav from "../DashNav/DashNav";
import s from "./GameTable.module.css";
import GameKategoryTable from "./GameKategoryTable";


const GameTable = ({ game }) => {
  return (
    <section className="sectionAdmin">
      <div className="container">
        <div className={s.tableBox}>
          <GameKategoryTable game={game} />
        </div>
      </div>
    </section>
  );
};

export default GameTable;
