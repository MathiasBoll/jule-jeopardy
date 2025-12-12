import React from "react";

// Komponent der viser tabellen med spørgsmål for én kategori
import KategoryGameTable from "./KategoryGameTable";

// CSS-module til styling af kategori-siden
import s from "./Kategory.module.css";

/*
  Kategory (Page)
  ---------------
  Dette er selve siden for redigering af én kategori i admin/CMS.

  Ansvar:
  - Sætter admin-layout (section + container)
  - Wrapper indholdet i korrekt styling
  - Renderer KategoryGameTable, som håndterer al data-logik

  Vigtigt:
  - Denne komponent henter IKKE selv data
  - Alt data styres i KategoryGameTable via URL-parametre
*/
const Kategory = () => {
  return (
    // Genbrugt admin-layout (samme som andre CMS-sider)
    <section className="sectionAdmin">
      <div className="container">
        {/* Styling-wrapper til kategori-indhold */}
        <div className={s.boxKategory}>
          {/* Viser spørgsmålene for valgt kategori */}
          <KategoryGameTable />
        </div>
      </div>
    </section>
  );
};

export default Kategory;
