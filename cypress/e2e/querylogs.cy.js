describe('Query Logs', () => {
    let userId;
    before(() => {
      cy.visit('http://localhost:3000');
      
  });
    it('should create a new user, sign in, connect to an endpoint, display a query', () => {
        cy.contains('button', 'Getting Started').click();
        cy.contains('button', 'Sign Up').click();
        const username = 'testuser';
        const password = 'testpassword';
        const email = 'test@example.com';
        cy.get('input[placeholder="Username"]').type(username);
        cy.get('input[placeholder="Email"]').type(email);
        cy.get('input[placeholder="Password"]').type(password);
        cy.contains('button', 'Sign Up').click();
        cy.url().should('include', '/signin');
        cy.contains('Sign In').should('be.visible');
        cy.get('input[placeholder="Username"]').type(username);
        cy.get('input[placeholder="Password"]').type(password);
        cy.contains('button', 'Sign In').click();
        //Connect endpoint
        const endpoint = 'https://countries.trevorblades.com/graphql';
        cy.get('input[placeholder="Enter URL or endpoint"]').type(endpoint);
        cy.contains('button', 'Send').click();
        
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

        //Check if addQueryLog will add query log and display i1
        
        cy.request('POST', '/api/addquerylog', {
          timestamp: new Date().toDateString(),
          endpoint: endpoint,
          latency: 240,
          depth:  1,
        })
        .then((response) => {
          expect(response.status).to.eq(200);
        });

        cy.contains(240).should('be.visible');
         
        cy.contains('button', 'Delete').click();

        cy.getCookie('ssid').then((cookie) => {
          if (cookie) {
            userId = cookie.value;
        
            cy.contains('button', 'Sign Out').click();
            cy.url().should('include', '/signin');
            if (userId) {
              cy.request('DELETE', `/api/deletequerylog/${userId}`);
              cy.request('DELETE', `/api/deleteuser/${userId}`);
            }
          }
        });

    });
    afterEach(() => {
      console.log('Test complete');
      });
  });
