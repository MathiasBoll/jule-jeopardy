import React from "react";
import s from "./DashBoard.module.css";

export const GameKategory = ({ label, children }) => {
  return (
    <div className={s.boardKategory}>
      <p className={s.label}>{label}</p>
      <div>{children}</div>
    </div>
  );
};
