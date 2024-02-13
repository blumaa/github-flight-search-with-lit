import { LitElement, html } from "lit";
import { Router } from "@lit-labs/router";
import "./RepoDetails";
import "./SearchRepo";
import "./SearchResults";
import "./RepoCard";

/**
 * This is the root.
 * ```
 * Should have:
 * header with search input and buttons
 * search results
 * Takes care of routing and state
 * ```
 */
export class GithubRepoSearch extends LitElement {
  #router = new Router(this, [
    {
      path: "/",
      render: () =>
        html`<search-repo
            @add-search-term=${this.onAddSearchTerm}
          ></search-repo>
          ${this.isLoading ? "finding repos" : null}
          <search-results .repos=${this.repoData}></search-results> `,
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
    this.isLoading = false;
    //   this.addEventListener("keydown", (e) =>
    //     console.log(e.type, e.target.localName),
    //   );
  }

  render() {
    return html`<div>${this.#router.outlet()}</div>`;
  }

  onAddSearchTerm(event) {
    this.repoData = [];
    this.isLoading = true;
    fetchGitHubRepos(event.detail)
      .then((data) => {
        this.repoData = data.items;
      })
      .finally(() => (this.isLoading = false));
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

