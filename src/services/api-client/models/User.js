export class User {
  constructor() {
    this._id = null;
    this._email = null;
    this._firstName = null;
    this._lastName = null;
    this._avatar = null;
  }
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    this._lastName = value;
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(value) {
    this._avatar = value;
  }

  get fullname() {
    return this.firstName + ' ' + this.lastName;
  }
}