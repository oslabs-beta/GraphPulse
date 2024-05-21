Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    return originalFn(url.startsWith('http') ? url : `http://localhost:3000${url}`, options);
  });