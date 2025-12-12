import React from "react";
import KategoryGameTable from "./KategoryGameTable";
import DashNav from "../DashNav/DashNav";

import s from "./Kategory.module.css";

const Kategory = () => {
  return (
    <section className="sectionAdmin">
      <div className="container">
        <DashNav />
        <div className={s.boxKategory}>
          <KategoryGameTable />
        </div>
      </div>
    </section>
  );
};

export default Kategory;
