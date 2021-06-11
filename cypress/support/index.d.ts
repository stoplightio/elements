// load type definitions that come with Cypress module

/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable {
    redirectUnpkgToLocalDistFolder(packageName: string);
  }
}
