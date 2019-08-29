export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface UserData {
  email: string;
  id: string;
  authToken: string;
  authTokenExpDate: string;
}

export function RequestData(email: string, password: string, returnSecureToken: boolean): void {
  this.email = email;
  this.password = password;
  this.returnSecureToken = returnSecureToken;
}

export enum Errors {
  EMAIL_EXISTS = 'Email already used',
  OPERATION_NOT_ALLOWED = 'Sign up is disabled',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'We have blocked all requests from this device due to unusual activity. ' +
    'Try again laterWe have blocked all requests from this device due to unusual activity. ' +
    'Try again later',
  EMAIL_NOT_FOUND = 'There is no user record corresponding to this identifier. The user may have been deleted.',
  INVALID_PASSWORD = 'The password is invalid or the user does not have a password',
  USER_DISABLED = 'The user account has been disabled by an administratorThe user account has been disabled by an administrator'
}
