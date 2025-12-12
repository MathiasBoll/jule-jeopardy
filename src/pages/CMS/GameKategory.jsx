// src/components/dashboard/GameKategory.jsx
// UI-komponent til at vise én kategori på Jeopardy-boardet i dashboardet
// Bruges som wrapper til kategorititel + indhold (fx spørgsmål / pointfelter)

import React from "react";
import s from "./DashBoard.module.css";

// GameKategory
// Props:
// - label: navnet på kategorien (fx "Julemad")
// - children: indholdet under kategorien
//             (fx spørgsmål, point-knapper eller admin-actions)
export const GameKategory = ({ label, children }) => {
  return (
    <div className={s.boardKategory}>
      {/* Kategorititel */}
      <p className={s.label}>{label}</p>

      {/* Indhold for kategorien */}
      <div>{children}</div>
    </div>
  );
};
