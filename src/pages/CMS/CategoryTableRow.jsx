import React from "react";
import clsx from "clsx";
import s from "./DashBoard.module.css";

export const CategoryTableRow = ({ align = "left", children }) => {
  return <td className={clsx(s.cell, s[align])}>{children}</td>;
};
