import React from "react";
import s from "./Kategory.module.css";

const DashBoardKategory = ({ label, children }) => {
  return (
    <div className={s.boardKategory}>
      <p className={s.labelKategory}>{label}</p>
      <div>{children}</div>
    </div>
  );
};

export default DashBoardKategory;
