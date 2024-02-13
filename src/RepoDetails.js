import { LitElement, html, nothing } from "lit";

const fetchOwnerData = async (userId) => {
  const response = await fetch(`https://api.github.com/user/${userId}`);
  const data = await response.json();
  return data;
};

export class RepoDetails extends LitElement {
  static properties = {
    ownerProfile: { type: Object },
    ownerId: { type: String },
  };

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.ownerId) {
      fetchOwnerData(this.ownerId).then((data) => {
        this.ownerProfile = data;
      });
    }
  }

  // updated(changedProperties) {
  //   if (changedProperties.has("ownerProfile")) {
  //     console.log(" updated");
  //   }
  // }

  render() {
    return html`
      <div>
        <div>Repo Details</div>
        <div>Owner id: ${this.ownerId}</div>
      </div>
      <div>
        <div>
          <div>
            ${this.ownerProfile && this.ownerProfile.avatar_url
              ? html`<img src=${this.ownerProfile.avatar_url} />`
              : nothing}
          </div>
          <div>
            Name:
            ${(this.ownerProfile && this.ownerProfile.name) || "no name found"}
          </div>
          <p>
            ${(this.ownerProfile && this.ownerProfile.bio) || "No bio found"}
          </p>
          <p>Followers: ${this.ownerProfile && this.ownerProfile.followers}</p>
        </div>
      </div>
      <a href="/"><---- back to search</a>
    `;
  }
}

customElements.define("repo-details", RepoDetails);
