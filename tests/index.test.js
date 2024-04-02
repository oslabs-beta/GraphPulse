const authController = require('../src/server/controllers/authController');


describe('authController', () => {
    it('should be able to create user', () => {
        expect(authController.createUser).toBeDefined();
        
    });

    it('should have a method to verify user', () => {
        expect(authController.verifyUser).toBeDefined();
    });
});

