import GamesDashboard from "./pages/CMS/GamesDashboard";
import JeopardyQuestion from "./pages/QuestionForm/JeopardyQuestion";
import Kategory from "./pages/Kategory/Kategory";
import GamesDashBoard from "./components/GamesDashBoard/GamesDashBoard";
import "./styles/global.css";
import "./App.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/games-dashboard" element={<GamesDashboard />} />
      <Route path="/game-play" element={<GamesDashBoard />} />
      <Route path="/kategory" element={<Kategory />} />
      <Route path="/jeopardy-question" element={<JeopardyQuestion />} />
      <Route path="/kategory/:gameId/:categoryId" element={<Kategory />} />
    </Routes>
  );
}
