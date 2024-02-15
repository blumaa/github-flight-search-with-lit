export const IS_LOADING = "IS_LOADING";
export const FETCH_REPOS = "FETCH_REPOS";

export const isLoading = (isLoading) => {
  return {
    type: IS_LOADING,
    isLoading,
  };
};

export const fetchRepos = (repos) => {
  console.log(repos, "action repos")
  return {
    type: FETCH_REPOS,
    repos,
  };
};
