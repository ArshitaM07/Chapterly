import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ReaderPage from "./pages/ReaderPage";
import ExplorePage from "./pages/ExplorePage";

function App() {
  return (
    <BrowserRouter>

      <Routes>


        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/reader" element={<ReaderPage />} />

        <Route path="/explore" element={<ExplorePage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;