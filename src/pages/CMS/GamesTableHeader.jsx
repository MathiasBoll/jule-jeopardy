// src/components/dashboard/GamesTableHeader.jsx
// Genbrugelig tabel-header-komponent til admin/dashboard-tabeller
// Wrapper omkring <th> som sikrer ens styling og alignment

import React from "react";
import s from "./DashBoard.module.css";

// GamesTableHeader
// Props:
// - children: indholdet i header-cellen (tekst, ikon osv.)
// - align: tekstjustering ("left", "center", "right")
//          matcher CSS-klasser i DashBoard.module.css
export const GamesTableHeader = ({ children, align = "left" }) => {
  return (
    <th
      // Basis-styling for alle tabel-headere
      // + dynamisk alignment via CSS module
      className={`${s.th} ${s[align]}`}
    >
      {children}
    </th>
  );
};
