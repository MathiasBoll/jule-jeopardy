// src/components/dashboard/CategoryLink.jsx
// Genbrugelig link-komponent til dashboard-navigation
// Wrapper omkring react-router-dom's <Link>
// Bruges til at navigere mellem admin-/dashboard-sider
// Ensretter styling og struktur for alle links

import React from "react";
import { Link } from "react-router-dom";
import s from "./DashBoard.module.css";

// CategoryLink
// Props:
// - to: ruten der navigeres til (fx "/admin/games")
// - label: tekst der vises i linket (valgfri)
// - children: alternativ måde at sende indhold (fx ikoner + tekst)
// - className: ekstra CSS-klasse(r) der kan tilføjes udover standard styling
export const CategoryLink = ({ to, label, children, className }) => {
  return (
    <Link
      // Kombinerer default dashboard-link styling
      // med evt. ekstra className sendt ind udefra
      className={`${s.link} ${className || ""}`}
      to={to}
    >
      {/* Hvis label er angivet, bruges den.
          Ellers bruges children (giver fleksibilitet) */}
      {label || children}
    </Link>
  );
};
