import React from "react";

// Navigation til venstre i admin (sidebar)
import DashNav from "../DashNav/DashNav";

// CSS-module der styrer layout/styling af tabellen
import s from "./GameTable.module.css";

// Komponent der viser kategorierne for det valgte spil
import GameKategoryTable from "./GameKategoryTable";

// GameTable er et layout-wrapper-component for admin-visningen af ét spil
const GameTable = ({ game }) => {
  return (
    // Overordnet admin-layout (bruges på alle admin-sider)
    <section className="sectionAdmin">
      
      {/* Container der holder indholdet centreret */}
      <div className="container">

        {/* Boks der styrer spacing og styling omkring tabellen */}
        <div className={s.tableBox}>
          
          {/* 
            Sender det valgte game videre til GameKategoryTable,
            som står for at vise kategorier og rediger-links
          */}
          <GameKategoryTable game={game} />

        </div>
      </div>
    </section>
  );
};

export default GameTable;
