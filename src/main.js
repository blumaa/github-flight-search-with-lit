import { LitElement, html } from "lit";
import { Router } from "@lit-labs/router";
import "./RepoDetails";
import "./SearchRepo";
import "./SearchResults";
import "./RepoCard";
import { connect } from "pwa-helpers";
import { store } from "./store";
import { fetchRepos, isLoading } from "./actions";

/**
 * This is the root.
 * ```
 * Should have:
 * header with search input and buttons
 * search results
 * Takes care of routing and state
 * ```
 */
export class GithubRepoSearch extends connect(store)(LitElement) {
  #router = new Router(this, [
    {
      path: "/",
      render: () => html`
        <search-repo @add-search-term=${this.onAddSearchTerm}></search-repo>
        <!-- How do I set search-results component to render when this.isLoading is false? -->
        ${this.isLoading ? "finding repos" : null}
        <search-results .repos=${this.repoData}></search-results>
      `,
    },
    {
      path: "/repo-details/:id",
      render: ({ id }) => {
        return html`<repo-details .ownerId=${id}></repo-details>`;
      },
    },
  ]);

  static properties = {
    repoData: { type: Array },
    isLoading: { type: Boolean },
  };

  constructor() {
    super();
    //   this.addEventListener("keydown", (e) =>
    //     console.log(e.type, e.target.localName),
    //   );
  }

  render() {
    return html`<div>${this.#router.outlet()}</div>`;
  }

  stateChanged(state) {
    console.log("isLoading", state.isLoading);
    this.repoData = state.repoData;
    this.isLoading = state.isLoading;
  }

  onAddSearchTerm(event) {
    store.dispatch(fetchRepos([]));
    store.dispatch(isLoading(true));
    fetchGitHubRepos(event.detail)
      .then((data) => {
        // this.repoData = data.items;
        store.dispatch(fetchRepos(data.items));
      })
      .finally(() => store.dispatch(isLoading(false)));
  }
}

const fetchGitHubRepos = async (repoName) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${repoName}`,
  );
  const data = await response.json();
  return data;
};

customElements.define("github-repo-search", GithubRepoSearch);
