import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/index.scss";
import { FileUploader, UploadForm } from "./renderer";

initializeIcons();

function Funil(): JSX.Element {
  return (
    <div id="funil">
      <header>
        <h1>Funil</h1>
      </header>
      <main>
        <UploadForm />
      </main>
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
