import { fixture, html } from "@open-wc/testing-helpers";
import "../src/SearchRepo.js";

/**
 * all ai generated!
 */
describe("SearchRepo", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<search-repo></search-repo>`);
  });

  it("renders with initial state", () => {
    const input = element.shadowRoot.querySelector("input");
    expect(input.value).toBe("");

    const buttons = element.shadowRoot.querySelectorAll("button");
    expect(buttons.length).toBe(2);
  });


  it("clears the input field when the reset button is clicked", async () => {
    const input = element.shadowRoot.querySelector("input");
    input.value = "test";
    const resetButton = element.shadowRoot.querySelector("button:nth-child(2)");
    resetButton.click();
    await element.updateComplete;
    expect(input.value).toBe("");
  });

  it("calls addSearchTerm when the search button is clicked", async () => {
    const input = element.shadowRoot.querySelector("input");
    input.value = "test";
    const searchButton = element.shadowRoot.querySelector(
      "button:nth-child(1)",
    );
    let detail;
    element.addEventListener("add-search-term", (e) => {
      detail = e.detail;
    });
    searchButton.click();
    await element.updateComplete;
    expect(detail).toBe("test");
  });

  it("calls addSearchTerm when the Enter key is pressed", async () => {
    const input = element.shadowRoot.querySelector("input");
    input.value = "test";
    let detail;
    element.addEventListener("add-search-term", (e) => {
      detail = e.detail;
    });
    input.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
    await element.updateComplete;
    expect(detail).toBe("test");
  });
});
