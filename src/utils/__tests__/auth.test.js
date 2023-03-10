import { getAuthToken, removeAuthToken, setAuthToken } from '../auth';

describe('getAuthToken', () => {
  it('should return null if no token is set', () => {
    expect(getAuthToken()).toBe(null);
  });

  it('should return the token if it is set', () => {
    setAuthToken('token');
    expect(getAuthToken()).toBe('token');
  });
});

describe('setAuthToken', () => {
  it('should set the token', () => {
    setAuthToken('token');
    expect(localStorage.getItem('authToken')).toBe('token');
  });
});

describe('removeAuthToken', () => {
  it('should remove the token', () => {
    setAuthToken('token');
    removeAuthToken();
    expect(localStorage.getItem('authToken')).toBe(null);
  });
});
