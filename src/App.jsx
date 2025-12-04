import GamesDashboard from "./pages/CMS/GamesDashboard";
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
    </Routes>
  );
}
