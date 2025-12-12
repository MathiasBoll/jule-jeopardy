import React from "react";
import s from "./Kategory.module.css";

/*
  DashBoardKategory
  -----------------
  Wrapper-komponent til admin-/dashboard-visninger.

  Formål:
  - Skabe et ensartet layout for CMS-/admin-sektioner
  - Vise en tydelig overskrift (label)
  - Indkapsle indhold (children) i et stiliseret "panel"

  Bruges fx til:
  - Kategori-overblik
  - Spørgsmålslister
  - Admin-tabeller

  Props:
  - label (string): Titel der vises øverst i boksen
  - children (ReactNode): Indholdet der vises inde i boksen
*/
const DashBoardKategory = ({ label, children }) => {
  return (
    <div className={s.boardKategory}>
      {/* Overskrift / label for dashboard-sektionen */}
      <p className={s.labelKategory}>{label}</p>

      {/* Indhold (typisk tabel eller form) */}
      <div>{children}</div>
    </div>
  );
};

export default DashBoardKategory;
