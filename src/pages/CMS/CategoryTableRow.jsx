// src/components/dashboard/CategoryTableRow.jsx
// Genbrugelig tabel-celle-komponent til dashboard-tabeller
// Wrapper omkring <td> der håndterer alignment og fælles styling
// Bruges fx i spil-, kategori- og spørgsmålsoversigter

import React from "react";
import clsx from "clsx";
import s from "./DashBoard.module.css";

// CategoryTableRow
// Props:
// - align: tekstjustering i cellen ("left", "center", "right")
//          matcher CSS-klasser i DashBoard.module.css
// - children: indholdet af cellen (tekst, knapper, links osv.)
export const CategoryTableRow = ({ align = "left", children }) => {
  return (
    <td
      // clsx bruges til sikkert at kombinere flere CSS-klasser
      // s.cell = basis-styling for alle tabelceller
      // s[align] = dynamisk alignment (fx s.left, s.center, s.right)
      className={clsx(s.cell, s[align])}
    >
      {children}
    </td>
  );
};
