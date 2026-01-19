import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/pagesBundle.jsx";
import { useStorageState } from "./states/states.jsx";

const API = ["http://localhost:5678/blogs?lang=", "http://localhost:5678/tags"];

function App() {
  const [language, setLanguage] = useStorageState("language", "ES");
  const [url, setUrl] = React.useState(`${API[0] + language}`);
  const [theme, setTheme] = useStorageState("theme", "");

  const handleTheme = () => {
    setTheme(event.target.value);
  };

  const handleLanguage = () => {
    if (language === "EN") {
      setLanguage("ES");
      setUrl(`${API[0]}ES`);
    } else {
      setLanguage("EN");
      setUrl(`${API[0]}EN`);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              language={language}
              handleLanguage={handleLanguage}
              theme={theme}
              handleTheme={handleTheme}
              url={url}
              setUrl={setUrl}
              API={API}
            />
          }
        />
        <Route
          path="/portfolio"
          element={<h1>Welcome to Portfolio Page </h1>}
        />

        <Route path="/about" element={<h1>Welcome to About Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
