

describe('Route tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('should display the splash page at the root url', () => {
      cy.url().should('include', '/');
      cy.contains('GraphPulse').should('be.visible');
    });
  
    it('should navigate to the sign in page, sign up page, and back to the splash page', () => {
      cy.get('a[href="/signin"]').click(); 
      cy.url().should('include', '/signin');
      cy.contains('Sign In').should('be.visible');
      cy.contains('button', 'Sign Up').click();
      cy.contains('Sign Up').should('be.visible');
      cy.get('button').eq(0).click();
      cy.url().should('include', '/');
    });

    it('should navigate to home page when a user signs in as guest and back to the splash page', () => {
      cy.get('a[href="/signin"]').click();
      cy.url().should('include', '/signin');
      cy.contains('button', 'Use as guest').click();
      cy.url().should('include', '/home');
      cy.contains('button', 'Home').click();
      cy.url().should('include', '/');
    });
});

