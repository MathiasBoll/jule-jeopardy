import "./App.css";
import GamesDashBoard from "./components/GamesDashBoard/GamesDashBoard";
import GamesDashboard from "./pages/CMS/GamesDashboard";
import GameBoardPage from "./pages/GameBoard/GameBoardPage";
import Kategory from "./pages/Kategory/Kategory";
import "./styles/global.css";

import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/game-select" replace />} />
      <Route path="/games-dashboard" element={<GamesDashboard />} />
      <Route path="/game-select" element={<GamesDashBoard />} />
      <Route path="/game-play" element={<GameBoardPage />} />
      <Route path="/kategory" element={<Kategory />} />
      <Route path="/kategory/:gameId/:categoryId" element={<Kategory />} />
    </Routes>
  );
}
