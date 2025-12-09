import React from "react";
import { Link } from "react-router-dom";
import s from "./DashBoard.module.css";

export const CategoryLink = ({ to, label, children, className }) => {
  return (
    <Link className={`${s.link} ${className}`} to={to}>
      {label || children}
    </Link>
  );
};
