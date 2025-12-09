import React from "react";
import s from "./DashBoard.module.css";

export const GamesTableHeader = ({ children, align = "left" }) => {
  return <th className={`${s.th} ${s[align]}`}>{children}</th>;
};
