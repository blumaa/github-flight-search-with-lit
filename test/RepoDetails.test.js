import "../src/RepoDetails"; // Assuming RepoDetails is in a separate file
import { fixture } from "@open-wc/testing-helpers";

describe("todo-list", () => {
  beforeEach(async () => {
    await fixture(`<repo-details .ownerId=${"5"}></repo-details>`);
  });

  it("has a headline", () => {
    // expect(screen.getByRole("heading")).toBeDefined();
  });
});
