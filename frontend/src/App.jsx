import Login from "./components/loginPage";
import Dashboard from "./components/dashboardSample";
import About from "./components/about";
import Protected from "./components/protected";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <Protected>
          <Dashboard />
          </Protected>} />
        <Route path="/about" element={<About />}/>
      </Routes>
    </Router>
  );
}

export default App;