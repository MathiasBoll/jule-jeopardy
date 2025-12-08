import React from "react";
import { Link } from "react-router-dom";
import s from "./DashBoard.module.css";

export const CategoryLink = ({ gameId, categoryId, label }) => {
  return (
    <Link className={s.link} to={`/kategory/${gameId}/${categoryId}`}>
      {label}
    </Link>
  );
};
