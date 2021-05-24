describe('API component', () => {
  it('loads correctly', () => {
    loadZoomApiPage();
  });

  it('navigates via table of contents', () => {
    loadZoomApiPage();
    cy.findByText('groups').click();
    cy.findByText('Create a group').click();
    cy.findByRole('heading', { name: /Create a group/i }).should('exist');
  });

  it('opens via url', () => {
    cy.visit('/zoom-api/operations/groupCreate');
    cy.findByRole('heading', { name: /Create a group/i }).should('exist');
  });

  it('does not break on select dropdown', () => {
    loadZoomApiPage();
    cy.visit('/zoom-api/operations/groups');
    cy.findByRole('button', { name: /request sample/i }).click();
    cy.findByText('Obj-C').should('exist');
  });
});

function loadZoomApiPage() {
  cy.visit('/zoom-api');
  cy.findByRole('heading', { name: 'Zoom API', level: 1 }).should('exist');
}
