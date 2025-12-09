import React from "react";
import s from "./DashBoard.module.css";

export const KategoryTable = ({ headers, children }) => {
  return (
    <table className={s.table}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody className={s.tBody}>{children}</tbody>
    </table>
  );
};
