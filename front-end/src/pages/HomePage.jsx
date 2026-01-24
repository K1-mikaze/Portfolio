import React from "react";
import "../style/HomePage.css";
import StaticAside from "../components/StaticAside.jsx";
import { TagSVG } from "../components/SVG.jsx";
import { useStorageState, useFetchData } from "../states/states.jsx";
import Loading from "../components/Loading.jsx";

function HomePage({
  language,
  handleLanguage,
  theme,
  handleTheme,
  url,
  setUrl,
  tags_url,
  blogs_url,
}) {
  const [blogs, dispatchBlogs] = React.useReducer(useFetchData, {
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

        <SearchAside
          language={language}
          setUrl={setUrl}
          tags_url={tags_url}
          blogs_url={blogs_url}
        />
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
    <section
      className={
        blogs.data.length > 0 ? "center-article" : "center-article no-elements"
      }
    >
      {blogs.isError && <p>Something Went Wrong</p>}
      {blogs.isLoading ? (
        <Loading />
      ) : (
        <ul>
          {blogs.data.length > 0 ? (
            blogs.data.map((Item) => <Card key={Item.id} Item={Item} />)
          ) : (
            <h1>Not Content Found</h1>
          )}
        </ul>
      )}
    </section>
  );
}

function SearchAside({ language, setUrl, tags_url, blogs_url }) {
  const [searchTerm, setSearchTerm] = useStorageState("search", "");

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchAction = () => {
    setUrl(`${blogs_url}${language}&match=${searchTerm}`);
  };

  const searchByTag = () => {
    setUrl(`${blogs_url}${language}&tag=${event.target.value}`);
  };

  const [tags, dispatchTags] = React.useReducer(useFetchData, {
    data: [],
    isError: false,
    isLoading: false,
  });

  const handleFetchTags = React.useCallback(async () => {
    dispatchTags({ type: "TAGS_FETCH_INIT" });
    try {
      const response = await fetch(tags_url);

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
  }, [tags_url]);

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
            <Loading />
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
