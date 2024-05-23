describe('User Authentication', () => {
    let userId;
    beforeEach(() => {
        cy.visit('/');
      });
    const username = 'testuser';
    const password = 'testpassword';
    const email = 'test@example.com';
  
    it('should create a new user, sigin in, and sign out ', () => {
        cy.visit('/signup');
    
        cy.get('input[placeholder="Username"]').type(username);
        cy.get('input[placeholder="Email"]').type(email);
        cy.get('input[placeholder="Password"]').type(password);
    
        cy.get('button#sign-up-btn').click();
    
        // Check for successful sign up message and store user ID
        cy.on('window:alert', (str) => {
          expect(str).to.equal(`User created successfully`);
        });
    
        // Check that we were redirected to the sign in page
        cy.url().should('include', '/signin');
      
        cy.get('input[placeholder="Username"]').type(username);
        cy.get('input[placeholder="Password"]').type(password);
      
        cy.get('button#sign-in-btn').click();
      
        // Check that we were redirected to the home page
        cy.url().should('include', '/home');
      
        // Get the user ID from the ssid cookie
        cy.getCookie('ssid').then((cookie) => {
          if (cookie) {
            userId = cookie.value;
        
            cy.contains('button', 'Sign Out').click();
            cy.url().should('include', '/signin');
            if (userId) {
              cy.request('DELETE', `/api/deleteuser/${userId}`);
            }
          }
        });

    })   

      afterEach(() => {
        console.log('Test complete');
      });


});