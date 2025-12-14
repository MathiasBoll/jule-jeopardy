import "./App.css";
import GamesDashboard from "./pages/CMS/GamesDashboard";
import GameBoardPage from "./pages/GameBoard/GameBoardPage";
import GameTable from "./pages/GameTable/GameTable";
import Home from "./pages/Home/Home";
import JeopardyQuestion from "./pages/JeopardyQuestion/JeopardyQuestion";
import Kategory from "./pages/Kategory/Kategory";
import Podium from "./pages/Podium/Podium";
import TeamSetup from "./pages/TeamSetup/TeamSetup";
import "./styles/global.css";

import { Route, Routes } from "react-router-dom";

// Hovedkomponent - definerer alle ruter i applikationen
export default function App() {
  return (
    <Routes>
      {/* Forside */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Admin/CMS ruter */}
      <Route path="/games-dashboard" element={<GamesDashboard />} />
      <Route
        path="/dashboard/games/:gameId/:categoryId/question/new"
        element={<JeopardyQuestion />}
      />
      <Route
        path="/dashboard/games/:gameId/:categoryId/question/:questionId/edit"
        element={<JeopardyQuestion />}
      />
      <Route path="/jeopardy-question" element={<JeopardyQuestion />} />

      {/* Spil ruter */}
      <Route path="/game-select" element={<TeamSetup />} />
      <Route path="/game-table/:gameId" element={<GameTable />} />
      <Route path="/game-play" element={<GameBoardPage />} />
      <Route path="/podium" element={<Podium />} />
      <Route path="/kategory" element={<Kategory />} />
      <Route path="/kategory/:gameId/:categoryId" element={<Kategory />} />
    </Routes>
  );
}
