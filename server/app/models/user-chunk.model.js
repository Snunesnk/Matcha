export class UserChunk {
  constructor(obj = {}) {
    this.login = obj.login || obj._login;
    this.password = obj.password || obj._password;
    this.email = obj.email || obj._email;

    this.token = obj.token || obj._token;

    this.name = obj.name || obj._name;
    this.surname = obj.surname || obj._surname;

    this.dateOfBirth = obj.dateOfBirth || obj._dateOfBirth;
  }

  get login() {
    return this._login;
  }

  set login(login) {
    if (login)
      this._login = login.trim();
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }

  get token() {
    return this._token;
  }

  set token(token) {
    this._token = token;
  }

  get dateOfBirth() {
    return this._dateOfBirth;
  }

  set dateOfBirth(dateOfBirth) {
    this._dateOfBirth = dateOfBirth;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    if (email)
      this._email = email.trim();
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (name)
      this._name = name.trim();
  }

  get surname() {
    return this._surname;
  }

  set surname(surname) {
    if (surname)
      this._surname = surname.trim();
  }

  toJSON() {
    return {
      login: this.login,
      password: this.password,
      email: this.email,
      name: this.name,
      surname: this.surname,
      token: this.token,
      dateOfBirth: this.dateOfBirth,
    };
  }
}
