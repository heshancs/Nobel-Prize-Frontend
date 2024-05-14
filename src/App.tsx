import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailedPage from "./pages/DetailedPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<DetailedPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
