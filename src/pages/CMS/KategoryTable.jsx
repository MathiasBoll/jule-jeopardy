// src/components/dashboard/KategoryTable.jsx
// Wrapper-komponent til tabeller i dashboardet
// Bruges til at vise kategorier, spil, spørgsmål osv.
// Sørger for ens struktur og styling af <table>

import React from "react";
import s from "./DashBoard.module.css";

// KategoryTable
// Props:
// - headers: JSX der repræsenterer tabel-headere (<th>-elementer)
//            sendes typisk ind som en liste af GamesTableHeader-komponenter
// - children: tabelrækker (<tr>) med indhold
export const KategoryTable = ({ headers, children }) => {
  return (
    <table className={s.table}>
      {/* Tabel-header */}
      <thead>
        <tr>
          {/* Header-celler sendes ind udefra */}
          {headers}
        </tr>
      </thead>

      {/* Tabel-body */}
      <tbody className={s.tBody}>
        {/* Rækker med data */}
        {children}
      </tbody>
    </table>
  );
};
