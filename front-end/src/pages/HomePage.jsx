import React from "react";
import "../style/HomePage.css";
import StaticAside from "../components/StaticAside.jsx";
import { TagSVG } from "../components/SVG.jsx";
import { useStorageState } from "../states/states.jsx";

const homePageReducer = (state, action) => {
  switch (action.type) {
    case "BLOGS_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };

    case "TAGS_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };

    case "BLOGS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case "TAGS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case "BLOGS_FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };

    case "TAGS_FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };

    default:
      throw new Error();
  }
};

function HomePage({
  language,
  handleLanguage,
  theme,
  handleTheme,
  url,
  setUrl,
  API,
}) {
  const [blogs, dispatchBlogs] = React.useReducer(homePageReducer, {
    data: [],
    isError: false,
    isLoading: false,
  });

  const handleFetchBlogs = React.useCallback(async () => {
    dispatchBlogs({ type: "BLOGS_FETCH_INIT" });
    try {
      const response = await fetch(url);

      if (!response) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      dispatchBlogs({
        type: "BLOGS_FETCH_SUCCESS",
        payload: data,
        isLoading: true,
      });
    } catch (error) {
      dispatchBlogs({ type: "BLOGS_FETCH_FAILURE" });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchBlogs();
  }, [handleFetchBlogs]);

  return (
    <>
      <article className={`grid-container ${theme}`}>
        <StaticAside
          language={language}
          handleLanguage={handleLanguage}
          handleTheme={handleTheme}
          theme={theme}
        />
        <MidleSection blogs={blogs} />

        <SearchAside language={language} setUrl={setUrl} API={API} />
      </article>
    </>
  );
}

function MidleSection({ blogs }) {
  const Card = ({ Item }) => {
    const image = `/images/${Item.image_path}`;
    return (
      <li id={Item.id} className="Card">
        <a href={Item.url}>
          <img src={image} alt={Item.title} />
          <h1>{Item.title}</h1>
          <p>{Item.description}</p>
          <ul className="tags-container">
            {Item.tags.map((tag) => (
              <li key={Item.id + tag.name + tag.id} className="tag">
                {tag.name}
              </li>
            ))}
          </ul>
        </a>
      </li>
    );
  };
  return (
    <section className="center-article">
      {blogs.isError && <p>Something Went Wrong</p>}
      {blogs.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <ul>
          {blogs.data.map((Item) => (
            <Card key={Item.id} Item={Item} />
          ))}
        </ul>
      )}
    </section>
  );
}

function SearchAside({ language, setUrl, API }) {
  const [searchTerm, setSearchTerm] = useStorageState("search", "");

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchAction = () => {
    setUrl(`${API[0]}${language}&match=${searchTerm}`);
  };

  const searchByTag = () => {
    setUrl(`${API[0]}${language}&tag=${event.target.value}`);
  };

  const [tags, dispatchTags] = React.useReducer(homePageReducer, {
    data: [],
    isError: false,
    isLoading: false,
  });

  const handleFetchTags = React.useCallback(async () => {
    dispatchTags({ type: "TAGS_FETCH_INIT" });
    try {
      const response = await fetch(API[1]);

      if (!response) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      dispatchTags({
        type: "TAGS_FETCH_SUCCESS",
        payload: data,
        isLoading: true,
      });
    } catch (error) {
      dispatchTags({ type: "TAGS_FETCH_FAILURE" });
    }
  }, [API[1]]);

  React.useEffect(() => {
    handleFetchTags();
  }, [handleFetchTags]);

  return (
    <aside className="right-aside">
      <div className="aside-container">
        <h2>{language === "EN" ? "Search an Article" : "Busca un Articulo"}</h2>
        <form action={searchAction}>
          <label htmlFor="match">
            <input
              id="match"
              type="text"
              name="match"
              value={searchTerm}
              onChange={handleSearchInput}
              autoFocus={true}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </label>
        </form>
        <div className="tag-title">
          <TagSVG />
          <h2>{language === "EN" ? "Tags" : "Etiquetas"}</h2>
        </div>
        <ul className="tags-container">
          {tags.isError && <p>Something Went Wrong</p>}
          {tags.isLoading ? (
            <p>Loading ...</p>
          ) : (
            tags.data.map((tag) => (
              <li key={tag.id + tag.name} className="tag">
                <button type="button" value={tag.name} onClick={searchByTag}>
                  {tag.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}

export default HomePage;
