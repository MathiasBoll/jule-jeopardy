import { useParams } from "react-router-dom";
import heroImg from "../../assets/img/hero_img.png";
import BackButton from "../../components/ui/BackButton";
import QuestionsTable from "./QuestionsTable";

import s from "./AdminQuestions.module.css";

const AdminQuestions = () => {
  const { gameId } = useParams();

  return (
    <div className={s.pageContainer}>
      <img src={heroImg} alt="" className={s.heroBackground} />
      <BackButton to={`/admin/categories/${gameId}`} />

      <div className={s.contentWrapper}>
        <QuestionsTable />
      </div>
    </div>
  );
};

export default AdminQuestions;
