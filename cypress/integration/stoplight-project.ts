describe('Stoplight component', () => {
  beforeEach(() => {
    cy.redirectUnpkgToLocalDistFolder('elements');
  });

  describe('Api page', () => {
    it('loads api page correctly', () => {
      loadStoplightProjectPage();
      cy.findByText('To-dos').click();
      cy.findByText('https://todos.stoplight.io/').should('exist');
      cy.findByText('https://stoplight.io/mocks/elements-examples/studio-demo/389434').should('exist');
      cy.findByRole('heading', { name: /API Key/ }).should('exist');
    });
  });

  describe('Operation page', () => {
    it('loads operation docs correctly', () => {
      loadCreateTodoPage();
      cy.findByRole('heading', { name: /Create Todo/i }).should('exist');
      cy.findByRole('heading', { name: /Request/i }).should('exist');
      cy.findByRole('heading', { name: /post \/todos/i }).should('exist');
      cy.findByRole('heading', { name: /Response/i }).should('exist');
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
      loadCreateTodoPage();
      cy.findByRole('button', { name: /send request/i }).click();

      // Temporarily changing response code as the requested api is unavailable
      cy.findByText('500 Internal Server Error').should('exist');
    });

    it('mocks response correctly', () => {
      loadListTodosPage();
      cy.findByRole('button', { name: /mocking/i }).click();
      cy.findByRole('menuitemcheckbox', { name: /enabled/i }).then(enabled => {
        enabled.trigger('click');
      });
      cy.findByRole('button', { name: /send request/i }).click();
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
  cy.visit('/stoplight-project');
}

function loadCreateTodoPage() {
  cy.visit('/stoplight-project/b3A6Mzg5NDM2-create-todo');
}

function loadListTodosPage() {
  cy.visit('/stoplight-project/b3A6Mzg5NDM1-list-todos');
}

function loadTodoSchemaPage() {
  cy.visit('/stoplight-project/c2NoOjkxNDY1MDA-todo');
}

function loadMarkdownPage() {
  cy.visit('/stoplight-project/ZG9jOjE-introduction');
}
