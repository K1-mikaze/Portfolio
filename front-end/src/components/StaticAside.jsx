import meImg from "../assets/me.webp";
import { GithubSVG, LinkedInSVG } from "../components/SVG.jsx";
import "../style/StaticAside.css";

function StaticAside({ language, handleLanguage, theme, handleTheme }) {
  const ES_text = {
    title: "Desarrollador de Software",
    home_url: "Inicio",
    portfolio_url: "Portafolio",
    about_url: "Sobre mi",
    language_btn: "Español",
  };
  const EN_text = {
    title: "Software Developer",
    home_url: "Home",
    portfolio_url: "Portfolio",
    about_url: "About me",
    language_btn: "English",
  };

  const sidebar = ({
    title,
    home_url,
    portfolio_url,
    about_url,
    language_btn,
  }) => (
    <aside className="static-aside">
      <div className="aside-container">
        <img src={meImg} alt="Me IMG"></img>
        <h1>Sergio IA</h1>
        <h3>{title}</h3>
        <div className="icons-container">
          <a href="https://github.com/K1-mikaze" target="_blank">
            <GithubSVG />
          </a>
          <a
            href="https://www.linkedin.com/in/sergio-idarraga-aguirre-b8473a319/"
            target="_blank"
          >
            <LinkedInSVG />
          </a>
        </div>
        <ol className="aside-links">
          <li>
            <a href="/">{home_url}</a>
          </li>
          <li>
            <a href="/portfolio">{portfolio_url}</a>
          </li>
          <li>
            <a href="/about">{about_url}</a>
          </li>
        </ol>
        <div className="button-controller">
          <button type="button" onClick={handleLanguage}>
            {language_btn}
          </button>
          <select
            id="colorscheme"
            name="colorscheme"
            value={theme}
            onChange={handleTheme}
          >
            <option value="">Gruvbox Light</option>
            <option value="CATPPUCCIN_LATTE">Catppuccin Latte</option>
            <option value="GRUVBOX_DARK"> Gruvbox Dark</option>
            <option value="CATPPUCCIN_MOCHA">Catppuccin Mocha</option>
          </select>
        </div>
      </div>
    </aside>
  );

  return sidebar(language === "EN" ? EN_text : ES_text);
}

export default StaticAside;
