import React from "react";
import "./App.css";
import { StaticAside } from "./components/StaticAside.jsx";

const blogsReducer = (state, action) => {
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

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState,
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

//Component
function App() {
  const url = `http://localhost:5678/blogs?lang=es`;

  const [blogs, dispatchBlogs] = React.useReducer(blogsReducer, {
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

      dispatchBlogs({ type: "BLOGS_FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatchBlogs({ type: "BLOGS_FETCH_FAILURE" });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchBlogs();
  }, [handleFetchBlogs]);

  const [language, setLanguage] = useStorageState("language", "ES");

  const handleLanguage = () => {
    if (language === "EN") {
      setLanguage("ES");
    } else {
      setLanguage("EN");
    }
  };

  return (
    <>
      <div className="grid-container CATPPUCCIN_MOCHA">
        <StaticAside language={language} HandleLanguage={handleLanguage} />
        <article>
          {blogs.isError && <p>Something Went Wrong</p>}
          {blogs.isLoading ? <p>Loading ...</p> : <Center list={blogs.data} />}
        </article>
        <SearchAside />
      </div>
    </>
  );
}

const Center = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Card Item={item} />
    ))}
  </ul>
);

const Card = ({ Item }) => (
  <li key={Item.id} id={Item.id} className="Card">
    <a href={Item.url}>
      <h1>{Item.title}</h1>
      <h2>{Item.description}</h2>
      <ul>
        {Item.tags.map((tag) => (
          <li className="tag">{tag.name}</li>
        ))}
      </ul>
    </a>
  </li>
);

const SearchAside = () => {
  return (
    <aside className="right-aside">
      <div className="aside-container"></div>
    </aside>
  );
};

export default App;
