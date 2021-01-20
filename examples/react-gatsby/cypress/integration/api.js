describe("API component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/zoom-api");
  });

  it("loads correctly", () => {
    cy.contains("h1", "Zoom").should("exist");
  });

  it("navigates via table of contents", () => {
    cy.contains("span", "Groups").click();
    cy.contains("span", "Create a group").click();
    cy.contains("p", "Create a group under your account").should("exist");
  });

  it("navigates via url", () => {
    cy.visit("http://localhost:4200/zoom-api/paths/~1groups/post");
    cy.contains("p", "Create a group under your account").should("exist");
  });
});
