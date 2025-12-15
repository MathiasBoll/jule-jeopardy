import s from "./DashBoard.module.css";

export const TableHeader = ({ children, align = "left" }) => {
  return <th className={`${s.th} ${s[align]}`}>{children}</th>;
};
