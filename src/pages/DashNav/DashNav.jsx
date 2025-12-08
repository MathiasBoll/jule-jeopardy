import React from "react";
import { Link } from "react-router-dom";
import s from "./DashNav.module.css";

const DashNav = () => {
  return (
    <nav>
      <ul className={s.dashNav}>
        <li className={s.dashItems}>
          <Link to={"/games-dashboard"}>Admin</Link>
        </li>
        <li className={s.dashItems}>
          <Link to={"/kategory"}>Kategory</Link>
        </li>
        <li className={s.dashItems}>
          <Link to={"/jeopardy-question"}>Jeopardy-Question</Link>
        </li>
      </ul>
    </nav>
  );
};
export default DashNav;
