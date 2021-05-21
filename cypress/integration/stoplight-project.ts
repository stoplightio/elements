describe('Stoplight component', () => {
  it('loads correctly', () => {
    loadStoplightProjectPage();
  });

  it('navigates via table of contents', () => {
    loadStoplightProjectPage();
    cy.findByText('pets').click();
    cy.findByText('Create a pet').click();
    cy.findByRole('heading', { name: /Create a pet/i, timeout: 30000 }).should('exist');
  });

  it('opens via url', () => {
    cy.visit('/stoplight-project/c2NoOjkxNDY1MDA-todo');
    cy.findByRole('heading', { name: /Todo/i, timeout: 30000 }).should('exist');
  });

  it('does not break on select dropdown', () => {
    loadStoplightProjectPage();
    cy.findByText('Create Todo').click();
    cy.findByRole('button', { name: /request sample/i, timeout: 30000 }).click();
    cy.findByText('Obj-C').should('exist');
  });
});

function loadStoplightProjectPage() {
  cy.visit('/');
  cy.findByRole('link', { name: /Stoplight Project/i }).click();
  cy.findByRole('heading', { name: 'Introduction' }).should('exist');
}
