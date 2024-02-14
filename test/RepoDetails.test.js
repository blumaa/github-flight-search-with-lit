import "../src/RepoDetails"; // Assuming RepoDetails is in a separate file
import { fixture } from "@open-wc/testing-helpers";

describe("repo-details", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(`<repo-details .ownerId=${"5"}></repo-details>`);
  });

  it("has title Repo Details", async () => {
    const elements = await element.shadowRoot.querySelectorAll("div");

    let repoDetailsDiv;
    elements.forEach((div) => {
      console.log(div.innerHTML);
      if (div.innerHTML.includes("<div>Repo Details</div>")) {
        repoDetailsDiv = div;
        return;
      }
    });

    expect(repoDetailsDiv).toBeDefined();
  });

  it("has an anchor link back to search", async () => {
    const anchor = await element.shadowRoot.querySelector("a");

    expect(anchor.innerHTML).toBe("&lt;---- back to search");
  });
});
