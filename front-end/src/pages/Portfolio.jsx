import React, { useState } from "react";
import StaticAside from "../components/StaticAside";
import Loading from "../components/Loading";
import "../style/Portfolio.css";
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

function Portfolio({ language, handleLanguage, theme, handleTheme, url }) {
  const portfolioReducer = (state, action) => {
    switch (action.type) {
      case "BLOGS_FETCH_INIT":
        return { ...state, isLoading: true, isError: false };

      case "BLOGS_FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };

      case "BLOGS_FETCH_FAILURE":
        return { ...state, isLoading: false, isError: true };

      default:
        throw new Error();
    }
  };
  const ES_text = {
    introduction: {
      title: "Bienvenido a mi Portafolio",
      slogan: "¿Qué vamos a construir hoy?", // Added accent on "Qué"
      intro:
        "Soy un Desarrollador de Software apasionado por la intersección entre el desarrollo de aplicaciones y los fundamentos de los sistemas operativos. Esta dualidad me permite crear software no solo funcional, sino también eficiente y consciente del sistema en el que se ejecuta. Aplico este mismo rigor para implementar arquitecturas limpias y código reproducible, explorando actualmente Nix para llevar estos conceptos al siguiente nivel. Con un dominio intermedio de Linux, busco retos donde pueda potenciar mis habilidades a un siguiente nivel.",
      btnProjects: "Ver mis Proyectos",
      btnContact: "Contacto",
      suggestedArticles: "Artículos Recomendados", // Corrected "Articulos" to "Artículos"
      btnBlog: "Leer Artículo", // Corrected "Articulo" to "Artículo"
    },
    technologies: "Mis Habilidades", // Added accent on "Tecnologías"
    projects: {
      title: "Proyectos",
      list: [
        {
          title: "Portafolio y Blog",
          description:
            "Portafolio y Blog personal en el cual busco compartir mis proyectos, conocimiento y pensamientos adquiridos durante la resolución de problemas.", // Added accent to "resolución", changed "cual" to "el cual", "adquirido" to "adquiridos"
          technologies: [
            "React",
            "CSS",
            "HTML",
            "Express",
            "Typescript",
            "JavaScript",
            "Nix",
          ],
          repoUrl: "https://github.com/K1-mikaze/portfolio",
          website: "test",
        },
      ],
      btnWebsite: "Ver el Sitio",
      btnRepo: "Ver el Repositorio",
    },
    contact: {
      title: "Contacto",
      nameLabel: "Nombre",
      messageLabel: "Mensaje",
      btnMessage: "Enviar Mensaje",
    },
  };

  const EN_text = {
    introduction: {
      title: "Welcome to my Portfolio",
      slogan: "What are we going to build today?",
      intro:
        "I am a Software Developer passionate about the intersection between application development and operating system fundamentals. This dual focus allows me to create software that is not only functional, but also efficient and system-aware. I apply this same rigor to implementing clean architectures and reproducible code, and I am currently exploring Nix to take these concepts to the next level. With an intermediate command of Linux, I am seeking challenges where I can elevate my skills to a higher tier.",
      btnProjects: "View my Projects",
      btnContact: "Contact",
      suggestedArticles: "Suggested Articles",
      btnBlog: "Read Article",
    },
    technologies: "My Skills",
    projects: {
      title: "Projects",
      list: [
        {
          title: "Portfolio and Blog",
          description:
            "A personal Portfolio and Blog where I share my projects, knowledge, and insights gained while solving problems.", // Corrected "Porfolio" to "Portfolio" and rewrote the sentence for clarity.
          technologies: [
            "React",
            "CSS",
            "HTML",
            "Express",
            "Typescript",
            "JavaScript",
            "Nix",
          ],
          repoUrl: "https://github.com/K1-mikaze/portfolio",
          website: "test",
        },
      ],
      btnWebsite: "View Website",
      btnRepo: "View Repository",
    },
    contact: {
      title: "Contact",
      nameLabel: "Name",
      messageLabel: "Message",
      btnMessage: "Send Message",
    },
  };
  const SectionArea = ({ text, url }) => {
    const Introduction = ({ url, text }) => {
      const FeaturedCarousel = ({ url, text }) => {
        const [blogs, dispatchBlogs] = React.useReducer(portfolioReducer, {
          data: [],
          isError: false,
          isLoading: false,
        });

        const handleFetchBlogs = React.useCallback(async () => {
          dispatchBlogs({ type: "BLOGS_FETCH_INIT" });
          try {
            const response = await fetch(`${url}${language}`);

            if (!response) {
              throw new Error(`Error ${response.status}`);
            }

            const data = await response.json();

            dispatchBlogs({
              type: "BLOGS_FETCH_SUCCESS",
              payload: data,
              isLoading: false,
              isError: false,
            });
          } catch (error) {
            dispatchBlogs({ type: "BLOGS_FETCH_FAILURE" });
          }
        }, [url]);

        React.useEffect(() => {
          handleFetchBlogs();
        }, [handleFetchBlogs]);

        const [currentIndex, setCurrentIndex] = useState(0);

        const featuredBlogs = blogs.data.slice(0, blogs.data.length);

        React.useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredBlogs.length);
          }, 5000);
          return () => clearInterval(interval);
        }, [featuredBlogs.length]);

        const nextSlide = () => {
          setCurrentIndex((prev) => (prev + 1) % featuredBlogs.length);
        };

        const prevSlide = () => {
          setCurrentIndex(
            (prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length,
          );
        };

        return (
          <div className="featured-carousel">
            <h2>{text.suggestedArticles}</h2>

            <div className="carousel-container">
              <button
                className="carousel-nav carousel-nav-prev"
                onClick={prevSlide}
              >
                ←
              </button>
              <div className="carousel-track">
                {blogs.isError && <p>Something Went Wrong</p>}
                {blogs.isLoading ? (
                  <Loading />
                ) : (
                  featuredBlogs.map((blog, index) => (
                    <div
                      key={index}
                      className="carousel-card"
                      style={{
                        opacity: index === currentIndex ? 1 : 0,
                        transform:
                          index === currentIndex
                            ? "scale(1)"
                            : "scale(0.8) translateX(" +
                              (index - currentIndex) * 20 +
                              "px)",
                      }}
                    >
                      <img src={`/images/${blog.image_path}`} alt="" />
                      <h4 className="carousel-card-title">{blog.title}</h4>
                      <p className="carousel-card-description">
                        {blog.description.length > 80
                          ? blog.description.substring(0, 80) + "..."
                          : blog.description}
                      </p>
                      <div className="carousel-card-technologies">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="carousel-tech-tag">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <a
                        href={blog.url}
                        target="_blank"
                        className="carousel-card-link"
                      >
                        {text.btnBlog}
                      </a>
                    </div>
                  ))
                )}
              </div>
              <button
                className="carousel-nav carousel-nav-next"
                onClick={nextSlide}
              >
                →
              </button>
            </div>
            <div className="carousel-dots">
              {featuredBlogs.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        );
      };
      return (
        <section className="portfolio-section intro-section">
          <div className="intro-content">
            <div className="intro-text">
              <h1>{text.title}</h1>
              <h2>{text.slogan}</h2>
              <p className="intro-description">{text.intro}</p>
              <div className="btns-container">
                <a href="#projects" className="btn-primary">
                  {text.btnProjects}
                </a>
                <a href="#contact" className="btn-primary">
                  {text.btnContact}
                </a>
              </div>
            </div>
            <FeaturedCarousel url={url} text={text} />
          </div>
        </section>
      );
    };

    const Technologies = ({ text }) => {
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
          name: "Linux",
          icon: <LinuxSVG />,
          link: "https://www.gnu.org/gnu/linux-and-gnu.en.html",
        },
      ];

      return (
        <section className="portfolio-section technologies-section">
          <h2>{text}</h2>
          <div className="technologies-grid">
            {technologies.map((tech, index) => (
              <a key={index} href={tech.link} target="_blank">
                <div className="tech-card">
                  <span className="tech-icon">{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      );
    };
    const Projects = ({ text }) => {
      return (
        <section id="projects" className="portfolio-section projects-section">
          <h2>{text.title}</h2>
          <div className="projects-grid">
            {text.list.map((project, index) => (
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
                <div className="project-buttons">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    className="project-link"
                  >
                    {text.btnRepo}
                  </a>

                  {project.website !== null ? (
                    <a
                      href={project.website}
                      target="_blank"
                      className="project-link"
                    >
                      {text.btnWebsite}
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };
    const Contact = ({ text }) => (
      <section id="contact" className="portfolio-section contact-section">
        <h2>{text.title}</h2>
        <form
          action="https://formsubmit.co/K1mikaze@proton.me"
          method="POST"
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name">{text.nameLabel}</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">{text.messageLabel}</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="btn-primary">
            {text.btnMessage}
          </button>
        </form>
      </section>
    );

    return (
      <section className="section-area">
        <div className="section-container">
          <Introduction url={url} text={text.introduction} />
          <Technologies text={text.technologies} />
          <Projects text={text.projects} />
          <Contact text={text.contact} />
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
      <SectionArea text={language === "ES" ? ES_text : EN_text} url={url} />
    </article>
  );
}

export default Portfolio;
