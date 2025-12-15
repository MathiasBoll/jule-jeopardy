import { CategoryLink } from "../CMS/CategoryLink";
import { CategoryTableRow } from "../CMS/CategoryTableRow";
import { KategoryTable } from "../CMS/KategoryTable";
import { TableHeader } from "../CMS/TableHeader";

import s from "./AdminCategories.module.css";

const CategoriesTable = ({ game }) => {
  if (!game) return <p className={s.statusText}>Intet spil valgt</p>;

  const categories = game.categories || [];

  return (
    <div className={s.tableWrapper}>
      <KategoryTable
        headers={
          <>
            <TableHeader>Kategori</TableHeader>
            <TableHeader>Handling</TableHeader>
          </>
        }
      >
        {categories.length === 0 ? (
          <tr>
            <td colSpan="2" className={s.emptyText}>
              Ingen kategorier fundet
            </td>
          </tr>
        ) : (
          categories.map((cat) => (
            <tr key={cat._id}>
              <CategoryTableRow>{cat.name}</CategoryTableRow>
              <CategoryTableRow>
                <CategoryLink
                  to={`/admin/questions/${game._id}/${cat._id}`}
                  label="Rediger"
                />
              </CategoryTableRow>
            </tr>
          ))
        )}
      </KategoryTable>
    </div>
  );
};

export default CategoriesTable;
