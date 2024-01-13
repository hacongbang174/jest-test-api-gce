export class DefaultError extends Error {
  static STATUS_CODE = 500; // You can change it, it depends how you use it
  name = "DefaultError";

  constructor() {
    super("Default error, add what you want");
  }
}

export class AuthenticationError extends Error {
  static STATUS_CODE = 401;
  name = "AuthenticationError";

  constructor() {
    super("Wrong credentials");
  }
}

export class BadRequestError extends Error {
  static STATUS_CODE = 400;
  name = "BadRequestError";

  constructor() {
    super("Bad Request");
  }
}

export class NotFoundError extends Error {
  static STATUS_CODE = 400;
  name = "NotFoundError";

  constructor() {
    super("Not found data");
  }
}
