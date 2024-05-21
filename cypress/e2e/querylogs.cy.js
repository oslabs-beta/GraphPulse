describe('Query Logs', () => {
    let userId;
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.contains('button', 'Getting Started').click();
        cy.contains('button', 'Sign Up').click();
        const username = 'testuser';
        const password = 'testpassword';
        const email = 'test@user.com';
        cy.get('input[placeholder="Username"]').type(username);
        cy.get('input[placeholder="Email"]').type(email);
        cy.get('input[placeholder="Password"]').type(password);
        cy.contains('button', 'Sign Up').click();
        cy.url().should('include', '/signin');
        cy.contains('Sign In').should('be.visible');
        cy.get('input[placeholder="Username"]').type(username);
        cy.get('input[placeholder="Password"]').type(password);
        cy.contains('button', 'Sign In').click();
});
    it('should display the query log page', () => {
        //Connect endpoint
        const endpoint = 'https://countries.trevorblades.com/graphql';
        cy.get('input[placeholder="Enter URL or endpoint"]').type(endpoint);
        cy.contains('button', 'Send').click();
        cy.url().should('include', '/home'); 
        
        //Run Query
        const query = `query Query {
            country(code: "BR") {
              name
              native
              capital
              emoji
              currency
              languages {
                code
                name
              }
            }
          }`;

        //Check if addQueryLog endpoint is called
        cy.intercept('POST', '/api/addquerylog').as('addQuery');

        cy.wait(6000).then(() => {
            cy.window().then((win) => {
              // Get the editor instance from the window object
              const editor = win.editor;
          
              console.log(editor);
              // Now you can use the editor's API
              editor.setValue(query);
            });
          });
          
          // Click the "Run Query" button
          cy.contains('button', 'Run Query').click();
          
          // Wait for the request to the addQueryLog endpoint
          cy.wait('@addQuery').then((interception) => {
            assert.isNotNull(interception.response.body, 'API call has data');
          });

        cy.contains('button', 'Run Query').click();

        // cy.wait('@addQuery').then((interception) => {
        //     assert.isNotNull(interception.response.body, 'API call has data');
        // });
    });
});