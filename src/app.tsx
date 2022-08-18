import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/index.scss";

initializeIcons();

function Funil(): JSX.Element {
  return (
    <div id="funil">
      <h1>Funil</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Funil />} />
      </Routes>
    </Router>
  );
}
