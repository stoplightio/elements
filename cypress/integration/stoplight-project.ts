describe('Stoplight component', () => {
  it('loads correctly', () => {
    loadStoplightProjectPage();
  });

  it('navigates via table of contents', () => {
    loadStoplightProjectPage();
    cy.findByText('pets').click();
    cy.findByText('Create a pet').click();
    cy.findByRole('heading', { name: /Create a pet/i }).should('exist');
  });

  it('opens via url', () => {
    cy.visit('/stoplight-project/reference/todos/models/todo-full.v1.json');
    cy.findByRole('heading', { name: /Todo Full/i }).should('exist');
  });
});

function loadStoplightProjectPage() {
  cy.visit('/');
  cy.findByRole('link', { name: /Stoplight Project/i }).click();
  cy.findByRole('heading', { name: 'Introduction' }).should('exist');
}
