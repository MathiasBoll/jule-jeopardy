import "./App.css";
import "./styles/global.css";

import { Route, Routes } from "react-router-dom";

// Pages
import GamePlayPage from "./pages/GamePlay/GamePlayPage";
import Home from "./pages/Home/Home";
import Podium from "./pages/Podium/Podium";
import TeamSetup from "./pages/TeamSetup/TeamSetup";

// Admin Pages
import AdminCategories from "./pages/AdminCategories/AdminCategories";
import AdminQuestionEdit from "./pages/AdminQuestionEdit/AdminQuestionEdit";
import AdminQuestions from "./pages/AdminQuestions/AdminQuestions";
import AdminDashboard from "./pages/CMS/AdminDashboard";

export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/categories/:gameId" element={<AdminCategories />} />
      <Route
        path="/admin/questions/:gameId/:categoryId"
        element={<AdminQuestions />}
      />
      <Route
        path="/admin/question/:gameId/:categoryId/new"
        element={<AdminQuestionEdit />}
      />
      <Route
        path="/admin/question/:gameId/:categoryId/:questionId"
        element={<AdminQuestionEdit />}
      />

      {/* Game routes */}
      <Route path="/game-select" element={<TeamSetup />} />
      <Route path="/game-play" element={<GamePlayPage />} />
      <Route path="/podium" element={<Podium />} />
    </Routes>
  );
}
