export class Comment {
  constructor() {
    this._id = null;
    this._text = null;
    this._createdAt = null;
    this._user = null;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = value;
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }
}