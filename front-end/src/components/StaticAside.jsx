import React from "react";
import meImg from "../assets/me.webp";
import { Github, LinkedIn } from "../components/SVG.jsx";

export const StaticAside = ({ language, HandleLanguage }) => {
  return (
    <aside className="static-aside">
      <div className="aside-container">
        <img src={meImg} alt="Me IMG"></img>
        <h1>Sergio IA</h1>
        <h3>
          {language === "ENGLISH"
            ? "Software Developer"
            : "Desarrollador de Software"}
        </h3>
        <div className="icons-container">
          <a href="">
            <Github />
          </a>
          <a href="">
            <LinkedIn />
          </a>
        </div>
        <ol>
          <li>
            <a href="#">{language === "ENGLISH" ? "Home" : "Inicio"}</a>
          </li>
          <li>
            <a href="#">
              {language === "ENGLISH" ? "Portfolio" : "Portafolio"}
            </a>
          </li>
          <li>
            <a href="#">{language === "ENGLISH" ? "About me" : "Sobre mi"}</a>
          </li>
        </ol>
        <button type="button" onClick={HandleLanguage}>
          {language === "ENGLISH" ? "Español" : "English"}
        </button>
        <select id="colorscheme" name="colorscheme">
          <option value="GRUVBOX_LIGHT">Gruvbox Light</option>
          <option value="GRUVBOX_DARK"> Gruvbox Dark</option>
          <option value="CATPPUCCIN_MOCHA">Catppuccin Mocha</option>
          <option value="CATPPUCCIN_LATTE">Catppuccin Latte</option>
        </select>
      </div>
    </aside>
  );
};
