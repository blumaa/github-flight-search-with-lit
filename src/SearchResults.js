import { LitElement, css, html } from "lit";

export class SearchResults extends LitElement {
  static properties = {
    repos: { type: Array },
    isLoading: { type: Boolean },
  };

  static styles = css`
    .RepoList {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `;

  constructor() {
    super();
    this.isLoading = true;
    this.repos = [];
  }

  updated(changedProperties) {
    if (changedProperties.has("repos")) {
      this.isLoading = false;
    }
  }

  render() {
    return html`
      <div class="RepoList">
        ${this.repos
          ? this.repos.map(
              (repo) => html` <repo-card .repo=${repo}></repo-card> `,
            )
          : "there are no results. try another search."}
      </div>
    `;
  }
}

customElements.define("search-results", SearchResults);
