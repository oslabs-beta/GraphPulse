const authController = require('../src/server/controllers/authController');
const cookieController = require('../src/server/controllers/cookieController');
const pool = require('../src/server/db/schemaModel');

jest.mock('../src/server/db/schemaModel');

// This block tests the functionality of creating a new user

describe('Creating a user', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        username: 'username',
        email: 'email@email.com',
        password: 'password'
      }
    };
    const res = {
      locals: {}
    };
    const next = jest.fn();

    pool.connect.mockResolvedValue({
      query: jest.fn().mockResolvedValueOnce({ rows: [] }) 
        .mockResolvedValueOnce({}) 
    });

    await authController.createUser(req, res, next);
    expect(res.locals.result).toBe('User created successfully');
    
  });
});

// This block tests the functionality of setting a SSID cookie

describe('cookieController', () => {
  it('should set a SSID cookie', async () => {
    const req = {
      body: {
        username: 'username',
        password: 'password'
      }
    };
    const res = {
      cookie: jest.fn(),
      locals: {}
    };
    const next = jest.fn();

    const mockClient = {
      query: jest.fn().mockResolvedValueOnce({ rows: [{ _id: '123', username: 'username' }] }),
      release: jest.fn()
    };
    jest.spyOn(pool, 'connect').mockResolvedValueOnce(mockClient);


    await cookieController.setSSIDCookie(req, res, next);
    expect(res.cookie).toHaveBeenCalledTimes(2);
    expect(res.locals.cookiePass).toBe('123');
  });
});