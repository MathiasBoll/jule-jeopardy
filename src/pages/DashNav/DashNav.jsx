import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./DashNav.module.css";

const DashNav = () => {
  const location = useLocation();

  const routes = [
    { path: "/games-dashboard", label: "Admin" },
    { path: "/game-table", label: "Game Table" },
    { path: "/kategory", label: "Kategory" },
    { path: "/dashboard", label: "Question" },
  ];

  // Find active segment for breadcrumb
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className={s.navWrapper}>
      <ul className={s.dashNav}>
        {routes.map(({ path, label }) => {
          const isActive = location.pathname.startsWith(path);

          return (
            <li
              key={label}
              className={`${s.dashItem} ${isActive ? s.active : ""}`}
            >
              <Link to={path}>{label}</Link>
            </li>
          );
        })}
      </ul>

      {/* Breadcrumbs */}
      <div className={s.breadcrumb}>
        {segments.map((seg, idx) => (
          <span key={idx} className={s.segment}>
            {seg}
            {idx < segments.length - 1 && " › "}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default DashNav;
