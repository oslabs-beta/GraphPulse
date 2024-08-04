const authController = require('../src/server/controllers/authController');
const cookieController = require('../src/server/controllers/cookieController');
const pool = require('../src/server/db/schemaModel');
const bcrypt = require('bcrypt');

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

    const mockClient = {
      query: jest.fn().mockResolvedValueOnce({ rows: [] }) 
        .mockResolvedValueOnce({}),
      release: jest.fn() // Add the release method here
    };
    jest.spyOn(pool, 'connect').mockResolvedValueOnce(mockClient);

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

// This block tests the functionality of logging in a user

describe('authController.verifyUser', () => {
  let req, res, next, mockClient;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        password: 'testpassword'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();

    mockClient = {
      query: jest.fn(),
      release: jest.fn()
    };
    jest.spyOn(pool, 'connect').mockResolvedValue(mockClient);
    bcrypt.compare = jest.fn(); // Ensure bcrypt.compare is a mock function
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify user successfully', async () => {
    mockClient.query.mockResolvedValueOnce({
      rows: [{ username: 'testuser', password: 'hashedpassword' }]
    });
    bcrypt.compare.mockResolvedValueOnce(true);

    await authController.verifyUser(req, res, next);

    expect(mockClient.query).toHaveBeenCalledWith(
      'SELECT username, password FROM users WHERE username = $1',
      ['testuser']
    );
    expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'hashedpassword');
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should return 401 for incorrect username', async () => {
    mockClient.query.mockResolvedValueOnce({ rows: [] });

    await authController.verifyUser(req, res, next);

    expect(mockClient.query).toHaveBeenCalledWith(
      'SELECT username, password FROM users WHERE username = $1',
      ['testuser']
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Sign in failed; Incorrect username or password');
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 for incorrect password', async () => {
    mockClient.query.mockResolvedValueOnce({
      rows: [{ username: 'testuser', password: 'hashedpassword' }]
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    await authController.verifyUser(req, res, next);

    expect(mockClient.query).toHaveBeenCalledWith(
      'SELECT username, password FROM users WHERE username = $1',
      ['testuser']
    );
    expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'hashedpassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Sign in failed; Incorrect username or password');
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle database connection failure', async () => {
    jest.spyOn(pool, 'connect').mockRejectedValueOnce(new Error('Connection failed'));

    await authController.verifyUser(req, res, next);

    expect(next).toHaveBeenCalledWith({
      log: expect.stringContaining('authController.verifyUser - pool connection failed; ERROR:'),
      message: { err: 'Error in authController.verifyUser; Check server logs' }
    });
    expect(mockClient.query).not.toHaveBeenCalled();
    expect(mockClient.release).not.toHaveBeenCalled();
  });
});