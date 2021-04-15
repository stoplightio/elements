describe('API component', () => {
  beforeEach(() => {
    cy.intercept('https://fixtures/*', async req => {
      req.reply({
        fixture: req.url.replace('https://fixtures/', ''),
        statusCode: 200,
      });
    });
  });

  it('loads correctly', () => {
    loadZoomApiPage();
  });

  it('navigates via table of contents', () => {
    loadZoomApiPage();
    cy.findByText('Groups').click();
    cy.findByText('Create a group').click();
    cy.findByRole('heading', { name: /Create a group/i }).should('exist');
  });

  it('opens via url', () => {
    cy.visit('/zoom-api/operations/groupCreate');
    cy.findByRole('heading', { name: /Create a group/i }).should('exist');
  });
});

function loadZoomApiPage() {
  cy.visit('/');
  cy.findByRole('link', { name: /Zoom Api/i }).click();
  cy.findByRole('heading', { name: 'Zoom', level: 1 }).should('exist');
}
