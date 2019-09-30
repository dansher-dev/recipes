export class User {
  constructor(public email: string, public id: string, private authToken: string, private authTokenExpDate: Date) {}

  get token(): string {
    if (!this.authToken || new Date() > this.authTokenExpDate) {
      return null;
    }
    return this.authToken;
  }
}
