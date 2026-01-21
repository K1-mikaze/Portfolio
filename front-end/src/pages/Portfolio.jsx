import StaticAside from "../components/StaticAside";
import "../style/Portfolio.css";
import meImg from "../assets/me.webp";
import {
  ReactSVG,
  NodeSVG,
  JavascriptSVG,
  TypescriptSVG,
  NixSVG,
  SpringSVG,
  FlutterSVG,
  LinuxSVG,
  GitSVG,
  HtmlSVG,
  JavaSVG,
  DartSVG,
  CssSVG,
  ExpressSVG,
} from "../components/SVG";

("use strict");

function Portfolio({ language, handleLanguage, theme, handleTheme }) {
  const projects = [
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio built with React and Vite, featuring theme switching and multi-language support.",
      technologies: ["React", "CSS", "HTML", "Express"],
      repoUrl: "https://github.com/K1-mikaze/portfolio",
    },
    {
      title: "E-Commerce App",
      description:
        "Full-stack e-commerce application with shopping cart and payment integration.",
      technologies: ["React", "Node.js", "MongoDB"],
      repoUrl: "https://github.com/K1-mikaze/ecommerce",
    },
    {
      title: "Weather Dashboard",
      description:
        "Real-time weather application with location-based forecasts and beautiful visualizations.",
      technologies: ["JavaScript", "API", "CSS"],
      repoUrl: "https://github.com/K1-mikaze/weather-dashboard",
    },
  ];

  const SectionArea = () => {
    const Introduction = () => (
      <section className="portfolio-section intro-section">
        <div className="intro-content">
          <div className="intro-text">
            <h2>Hi There</h2>
            <h1>I'M Sergio</h1>
            <p className="intro-description">
              Software Developer passionate about creating beautiful and
              functional web applications. I love turning complex problems into
              simple, elegant solutions.
            </p>
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
          </div>
          <div className="intro-image">
            <img src={meImg} alt="Sergio" />
          </div>
        </div>
      </section>
    );

    const Technologies = () => {
      const technologies = [
        {
          name: "Spring Boot",
          icon: <SpringSVG />,
          link: "https://spring.io/projects/spring-boot",
        },
        {
          name: "Flutter",
          icon: <FlutterSVG />,
          link: "https://flutter.dev/",
        },
        { name: "React", icon: <ReactSVG />, link: "https://react.dev/" },
        {
          name: "Express",
          icon: <ExpressSVG />,
          link: "https://expressjs.com/",
        },
        {
          name: "TypeScript",
          icon: <TypescriptSVG />,
          link: "https://www.typescriptlang.org/",
        },
        {
          name: "JavaScript",
          icon: <JavascriptSVG />,
          link: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript",
        },
        {
          name: "Java",
          icon: <JavaSVG />,
          link: "https://www.java.com/en/download/help/whatis_java.html",
        },
        { name: "Dart", icon: <DartSVG />, link: "https://dart.dev/" },
        { name: "Nix", icon: <NixSVG />, link: "https://nixos.org/" },
        { name: "Node.js", icon: <NodeSVG />, link: "https://nodejs.org/en" },
        {
          name: "HTMl",
          icon: <HtmlSVG />,
          link: "https://www.hostinger.com/tutorials/what-is-html",
        },
        {
          name: "CSS",
          icon: <CssSVG />,
          link: "https://www.hostinger.com/tutorials/what-is-css",
        },
        { name: "Git", icon: <GitSVG />, link: "https://git-scm.com/" },
        {
          name: "GNU Linux",
          icon: <LinuxSVG />,
          link: "https://www.gnu.org/gnu/linux-and-gnu.en.html",
        },
      ];

      return (
        <section className="portfolio-section technologies-section">
          <h2>Technologies</h2>
          <div className="technologies-grid">
            {technologies.map((tech, index) => (
              <a href={tech.link} target="_blank">
                <div key={index} className="tech-card">
                  <span className="tech-icon">{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      );
    };
    const Projects = () => (
      <section id="projects" className="portfolio-section projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="project-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                className="project-link"
              >
                View Repository
              </a>
            </div>
          ))}
        </div>
      </section>
    );

    const Contact = () => (
      <section id="contact" className="portfolio-section contact-section">
        <h2>Contact</h2>
        <form
          action="https://formsubmit.co/K1mikaze@proton.me"
          method="POST"
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </section>
    );

    return (
      <section className="section-area">
        <div className="section-container">
          <Introduction />
          <Technologies />
          <Projects />
          <Contact />
        </div>
      </section>
    );
  };

  return (
    <article className={`grid-page ${theme}`}>
      <StaticAside
        language={language}
        handleLanguage={handleLanguage}
        theme={theme}
        handleTheme={handleTheme}
      />
      <SectionArea />
    </article>
  );
}

export default Portfolio;
