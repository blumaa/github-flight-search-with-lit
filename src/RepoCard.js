import { LitElement, css, html, nothing } from "lit";

const calculateRepoScore = (repo) => {
  const { open_issues_count, score, stargazers_count } = repo;
  // Calculate an overall score based on the number of open issues, the github score, and the stargazers
  const overallScore = (open_issues_count + score + stargazers_count) / 3;

  // Map the overall score to a scale from 1 to 5 stars
  if (overallScore >= 80) {
    return "Five Stars";
  } else if (overallScore >= 60) {
    return "Four Stars";
  } else if (overallScore >= 40) {
    return "Three Stars";
  } else if (overallScore >= 20) {
    return "Two Stars";
  } else {
    return "One Star";
  }
};

export class RepoCard extends LitElement {
  static properties = {
    repo: { type: Object },
  };

  constructor() {
    super();
  }

  // disconnectedCallback() {
  //   console.log("disconnected");
  // }

  static styles = css`
    :host {
      padding: 25px;
      border: 1px solid blue;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      cursor: pointer;
    }
    img {
      width: 40px;
      height: 40px;
    }
    a {
      text-decoration: none; /* Remove underline */
      color: inherit; /* Inherit text color from parent */
      cursor: default; /* Optionally, remove pointer cursor on hover */
      transition: transform 0.3s ease; /* Add smooth transition effect */
    }

    a:hover {
      text-decoration: none; /* Remove underline on hover */
      cursor: pointer;
      transform: scale(
        1.2
      ); /* Scale the anchor tag to 1.2 times its original size */

      /* Optionally, add other styles for hover state */
    }
  `;

  render() {
    if (this.repo) {
      const formattedDate = new Intl.DateTimeFormat("en-DE").format(
        new Date(this.repo.updated_at),
      );

      return html`
        <a href=${"/repo-details/" + this.repo.owner.id}>
          <div>
            <div class="RepoCardHeader">
              <div>Name: ${this.repo.name}</div>
              ${this.repo.owner && this.repo.owner.avatar_url
                ? html`<img src=${this.repo.owner.avatar_url} />`
                : nothing}
            </div>
            <div class="RepoCardBody">
              <div>
                description: ${this.repo.desription || "no description found"}
              </div>
              <div>repo score: ${calculateRepoScore(this.repo)}</div>
              <div>language: ${this.repo.language}</div>
              <div>last updated: ${formattedDate}</div>
            </div>
          </div>
        </a>
      `;
    } else {
      return nothing;
    }
  }
}

customElements.define("repo-card", RepoCard);
