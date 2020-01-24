declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
}