import React from "react";

// use the localStorage to store a value and got it in new sessions
const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState,
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

// Fetch blogs and tags from the API
const useFetchData = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };

    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };

    default:
      throw new Error();
  }
};

export { useStorageState, useFetchData };
