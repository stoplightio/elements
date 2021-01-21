function loadMainPage() {
  cy.visit('/');
  cy.findByRole('link', { name: /Stoplight Project/i }).click();
  cy.findByRole('heading', { name: 'Introduction' }).should('exist');
}

describe('Stoplight component', () => {
  it('loads correctly', () => {
    loadMainPage();
  });

  it('navigates via table of contents', () => {
    loadMainPage();
    cy.findByText('pets').click();
    cy.findByText('Create a pet').click();
    cy.findByRole('heading', { name: /POST \/pets/i }).should('exist');
  });

  it('navigates via url', () => {
    cy.visit('/stoplight-project/reference/todos/models/todo-full.v1.json');
    cy.findByRole('heading', { name: /Todo Full/i }).should('exist');
  });
});
