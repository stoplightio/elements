///<reference path="../support/index.d.ts"/>
describe('API component', () => {
  beforeEach(() => {
    cy.redirectUnpkgToLocalDistFolder('elements');
  });

  describe('Api page', () => {
    it('loads api page correctly', () => {
      loadZoomApiPage();
      cy.findByText('https://api.zoom.us/v2').should('exist');
      cy.findByRole('heading', { name: /API Key/ }).should('exist');
      cy.findByText('API Description').should('exist');
    });
  });

  describe('Operation page', () => {
    it('loads operation docs correctly', () => {
      cy.visit('/zoom-api/operations/groupCreate');
      cy.findByRole('heading', { name: /Create a group/i }).should('exist');
      cy.findByRole('heading', { name: /Request/i }).should('exist');
      cy.findByRole('heading', { name: /post \/groups/i }).should('exist');
      cy.findByRole('heading', { name: /Response/i }).should('exist');
    });

    it('does not break on select dropdown', () => {
      loadZoomApiPage();
      cy.visit('/zoom-api/operations/groups');
      cy.findByRole('button', { name: /request sample/i }).click();
      cy.findByText('Obj-C').should('exist');
    });

    it('displays request sample correctly', () => {
      cy.visit('/zoom-api/operations/userCreate');
      cy.findByLabelText(/curl/i).should('exist');
      cy.findByLabelText(/--request post/i).should('exist');
    });

    it('displays example correctly', () => {
      cy.visit('/zoom-api/operations/users');
      cy.findByLabelText(/{.+}/).should('exist');
    });

    it('displays schema correctly', () => {
      cy.visit('/zoom-api/operations/userCreate');
      cy.findAllByText('action').should('exist');
      cy.findAllByText('password').should('exist');
    });

    it('invokes TryIt request (receives network error)', () => {
      cy.visit('/zoom-api/operations/userCreate');
      cy.findByRole('button', { name: /Send Request/i }).click();
      cy.findByRole('button', { name: 'Error' }).should('exist');
    });

    it('navigates on auth badge', () => {
      cy.visit('/zoom-api/operations/userCreate');
      cy.findByRole('link', { name: 'API Key' }).click();
      cy.findByRole('heading', { name: 'Zoom API', level: 1 }).should('exist');
    });
  });

  describe('Schema page', () => {
    it('loads schema page correctly', () => {
      cy.visit('/zoom-api/schemas/Account');
      cy.findByRole('heading', { name: /Account/i }).should('exist');
      cy.findAllByText('first_name').should('exist');
      cy.findAllByText('pay_mode').should('exist');
    });

    it('displays example correctly', () => {
      cy.visit('/zoom-api/schemas/Account');
      cy.findByLabelText(/{.+}/).should('exist');
    });
  });

  it('navigates via table of contents', () => {
    loadZoomApiPage();
    cy.findByText('groups').click();
    cy.findByText('Create a group').click();
    cy.findByRole('heading', { name: /Create a group/i }).should('exist');
  });
});

function loadZoomApiPage() {
  cy.visit('/zoom-api');
  cy.findByRole('heading', { name: 'Zoom API', level: 1 }).should('exist');
}
