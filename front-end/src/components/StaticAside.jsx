import meImg from "../assets/me.webp";
import { Github, LinkedIn } from "../components/SVG.jsx";

export const StaticAside = () => {
  return (
    <aside className="static-aside">
      <div className="aside-container">
        <img src={meImg} alt="Me IMG"></img>
        <h1>Sergio IA</h1>
        <h3>Software Developer</h3>
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
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ol>
        <button type="button">Español</button>
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
