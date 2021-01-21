function loadMainPage() {
  cy.visit('/');
  cy.findByRole('link', { name: /Zoom Api/i }).click();
  cy.findByRole('heading', { name: 'Zoom' }).should('exist');
}

describe('API component', () => {
  it('loads correctly', () => {
    loadMainPage();
  });

  it('navigates via table of contents', () => {
    loadMainPage();
    cy.findByText('Groups').click();
    cy.findByText('Create a group').click();
    cy.findByRole('heading', { name: /POST \/groups/i }).should('exist');
  });

  it('navigates via url', () => {
    cy.visit('/zoom-api/paths/~1groups/post');
    cy.findByRole('heading', { name: /POST \/groups/i }).should('exist');
  });
});
