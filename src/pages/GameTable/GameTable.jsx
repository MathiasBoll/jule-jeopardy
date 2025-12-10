import React from "react";
import DashNav from "../DashNav/DashNav";
import s from "./GameTable.module.css";
import GameKategoryTable from "./GameKategoryTable";

const GameTable = () => {
  return (
    <section className={`sectionAdmin`}>
      <div className={`admin-container`}>
        <aside className={`sidebar`}>
          <DashNav />
        </aside>
        <div className={s.tableBox}>
          <GameKategoryTable />
        </div>
      </div>
    </section>
  );
};

export default GameTable;
