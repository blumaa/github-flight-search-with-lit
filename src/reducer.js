const exampleRepos = [
  {
    name: "test",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    },
    language: "JavaScript",
    updated_at: "2021-10-01T00:00:00Z",
  },
  {
    name: "test 2",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    },
    language: "Ruby",
    updated_at: "2021-10-01T00:00:00Z",
  },
];

const INITIAL_STATE = {
  repoData: exampleRepos,
  isLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_REPOS":
      return {
        ...state,
        repoData: action.repos,
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
        // isLoading: action.payload,
      };
    default:
      return state;
  }
};
