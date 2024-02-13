import { LitElement,  html } from "lit";

export class SearchRepo extends LitElement {
  static properties = {
    repos: { type: Array },
    isLoading: { type: Boolean },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <p>Search for a repo on Github</p>
      </header>
      <div>
        <input @keypress=${this.onKeyPress} />
      </div>
      <div>
        <button @click=${this.onSearch}>Search</button>
        <button @click=${this.onReset}>Reset</button>
      </div>
    `;
  }

  onReset() {
    const inputElement = this.shadowRoot.querySelector("input");
    if (inputElement) {
      inputElement.value = "";
    }
  }

  onSearch() {
    const inputElement = this.shadowRoot.querySelector("input");
    if (inputElement.value) {
      this.addSearchTerm(inputElement.value);
      // this.isLoading = true;
    }
  }

  onKeyPress(event) {
    if (event.key === "Enter" && event.target.value) {
      event.preventDefault();
      const value = event.target.value;
      this.addSearchTerm(value);
      // this.isLoading = true;
    }
  }

  addSearchTerm(body) {
    this.dispatchEvent(
      new CustomEvent("add-search-term", {
        detail: body,
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define("search-repo", SearchRepo);
