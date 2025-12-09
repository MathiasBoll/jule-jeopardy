import React from "react";
import DashNav from "../DashNav/DashNav";
import KategoryGameTable from "./KategoryGameTable";

import s from "./Kategory.module.css";

const Kategory = () => {
  return (
    <section className={`sectionAdmin`}>
      <DashNav />
      <div className={`container admin-container`}>
        <div className={s.boxKategory}>
          <h2 className={s.kategoryTitle}>Kategory</h2>
          <div>
            <KategoryGameTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kategory;
