describe('Stoplight component', () => {
  beforeEach(() => {
    cy.redirectUnpkgToLocalDistFolder('elements');
  });

  describe('Api page', () => {
    it('loads api page correctly', () => {
      loadStoplightProjectPage();

      cy.intercept(`https://stoplight.io/api/v1/projects/cHJqOjYwNjYx/nodes/**`).as('getNode');
      cy.findByText('To-dos').click();
      cy.wait('@getNode');

      cy.findByText('https://todos.stoplight.io').should('exist');
      cy.findByText('https://stoplight.io/mocks/elements-examples/studio-demo/389434').should('exist');

      /* With the change from displaying securitySchemes to security on the HttpService component,
          this is no longer visible until we update the test schema - which is in a github project:
          https://github.com/stoplightio/studio-demo - that may no longer exist. 

          For now, will look at a different heading but once we update test data will revert this change.
          TODO (DKT 9/26/23) */

      //cy.findByRole('heading', { name: /API Key/ }).should('exist');
      cy.findByRole('heading', { name: /Additional Information/ }).should('exist');
    });
  });

  describe('Operation page', () => {
    it('loads operation docs correctly', () => {
      loadCreateTodoPage();
      cy.findByRole('heading', { name: /Create Todo/i }).should('exist');
      cy.findByRole('heading', { name: /Request/i }).should('exist');
      cy.findByRole('heading', { name: /Response/i }).should('exist');
      cy.findByRole('heading', { name: /Security: API Key/ }).should('exist');
    });

    it('does not break on select dropdown', () => {
      loadCreateTodoPage();
      cy.findByRole('button', { name: /request sample/i }).click();
      cy.findByText('Obj-C').should('exist');
    });

    it('displays request sample correctly', () => {
      loadCreateTodoPage();
      cy.findByLabelText(/curl/i);
      cy.findByLabelText(/--request post/i).should('exist');
    });

    it('displays example correctly', () => {
      loadListTodosPage();
      cy.findByLabelText(/\[.+\]/).should('exist');
    });

    it('displays schema correctly', () => {
      loadCreateTodoPage();
      cy.findByText('id').should('exist');
      cy.findByText('completed_at').should('exist');
    });

    it('invokes TryIt request', () => {
      loadListTodosPage();

      cy.intercept(
        {
          method: 'GET',
          hostname: 'todos.stoplight.io',
          pathname: '/**',
          https: true,
        },
        {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'content-type',
            'Content-Type': 'application/json',
          },
          body: '"hello world"',
        },
      ).as('todos-api');

      cy.findByRole('button', { name: /send api request/i }).click();

      cy.wait('@todos-api');

      cy.findByText('hello world').should('exist');
    });

    it('mocks response correctly', () => {
      loadListTodosPage();
      cy.findByRole('button', { name: /server/i }).click();
      cy.findByRole('menuitemradio', { name: /mock server/i }).then(enabled => {
        enabled.trigger('click');
      });
      cy.intercept('https://stoplight.io/mocks/**').as('getData');
      cy.findByRole('button', { name: /send api request/i }).click();
      cy.wait('@getData');
      cy.findByText('200 OK').should('exist');
    });
  });

  describe('Schema page', () => {
    it('loads schema page correctly', () => {
      loadTodoSchemaPage();
      cy.findByRole('heading', { name: /Todo/i }).should('exist');
      cy.findByText('id').should('exist');
      cy.findByText('completed_at').should('exist');
    });

    it('displays example correctly', () => {
      loadTodoSchemaPage();
      cy.findByLabelText(/{.+}/).should('exist');
    });
  });

  describe('Markdown page', () => {
    it('loads markdown page correctly', () => {
      loadMarkdownPage();
      cy.findByRole('heading', { name: 'Introduction' }).should('exist');
      cy.findByText(
        'A primary goal of Studio is to enrich, not replace, your existing workflows. It works offline, with folders and files on your computer, just like your favorite IDEs.',
      ).should('exist');
    });
  });

  it('navigates via table of contents', () => {
    loadStoplightProjectPage();
    cy.findByText('pets').click();
    cy.findByText('Create a pet').click();
    cy.findByRole('heading', { name: /Create a pet/i }).should('exist');
  });
});

function loadStoplightProjectPage() {
  cy.intercept('https://stoplight.io/api/v1/projects/cHJqOjYwNjYx/nodes/**').as('getNode');
  cy.intercept(`https://stoplight.io/api/v1/projects/cHJqOjYwNjYx/table-of-contents`).as('getToc');
  cy.visit('/stoplight-project');
  cy.wait('@getNode');
  cy.wait('@getToc');
}

function loadCreateTodoPage() {
  visitNode('b3A6Mzg5NDM2', 'create-todo');
}

function loadListTodosPage() {
  visitNode('b3A6Mzg5NDM1', 'list-todos');
}

function loadTodoSchemaPage() {
  visitNode('c2NoOjkxNDY1MDA', 'todo');
}

function loadMarkdownPage() {
  visitNode('ZG9jOjE', 'introduction');
}

function visitNode(nodeId: string, nodeSlug: string) {
  cy.intercept(`https://stoplight.io/api/v1/projects/cHJqOjYwNjYx/nodes/${nodeId}-${nodeSlug}`).as('getNode');
  cy.intercept(`https://stoplight.io/api/v1/projects/cHJqOjYwNjYx/table-of-contents`).as('getToc');
  cy.visit(`/stoplight-project/${nodeId}-${nodeSlug}`);
  cy.wait('@getNode');
  cy.wait('@getToc');
}
