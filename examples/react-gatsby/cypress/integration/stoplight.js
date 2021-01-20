describe("Stoplight component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  it("loads correctly", () => {
    cy.contains("h1", "Introduction").should("exist");
  });

  it("navigates via table of contents", () => {
    cy.contains("span", "pets").click();
    cy.contains("span", "Create a pet").click();
    cy.contains("h2", "post").should("exist");
    cy.contains("h2", "/pets").should("exist");
  });

  it("navigates via url", () => {
    cy.visit(
      "http://localhost:4200/elements/reference/petstore/openapi.v1.yaml/paths/~1pets/post"
    );
    cy.contains("h2", "post").should("exist");
    cy.contains("h2", "/pets").should("exist");
  });
});
