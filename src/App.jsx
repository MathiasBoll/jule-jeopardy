import "./App.css";
import GamesDashboard from "./pages/CMS/GamesDashboard";
import GameBoardPage from "./pages/GameBoard/GameBoardPage";
import GameTable from "./pages/GameTable/GameTable";
import Home from "./pages/Home/Home";
import JeopardyQuestion from "./pages/JeopardyQuestion/JeopardyQuestion";
import Kategory from "./pages/Kategory/Kategory";
import TeamSetup from "./pages/TeamSetup/TeamSetup";
import "./styles/global.css";

import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/games-dashboard" element={<GamesDashboard />} />
      <Route path="/jeopardy-question" element={<JeopardyQuestion />} />
      <Route path="/game-select" element={<TeamSetup />} />
      <Route path="/game-table" element={<GameTable />} />
      <Route path="/game-play" element={<GameBoardPage />} />
      <Route path="/kategory" element={<Kategory />} />
      <Route path="/kategory/:gameId/:categoryId" element={<Kategory />} />
    </Routes>
  );
}
