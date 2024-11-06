const OK = (data, message) => {
  return {
    code: 200,
    status: "OK",
    message: message ? message : "Success",
    data: data,
  };
};

const ERROR = (message = "SERVER ERROR") => {
  return {
    code: 400,
    status: "SERVER ERROR",
    message: message,
  };
};

const NOT_FOUND = (message = "NOT FOUND") => {
  return {
    code: 404,
    status: "NOT FOUND",
    message: message,
  };
};

const PERMISSION_DENIED = (message = "Permission Denied") => {
  return {
    code: 403,
    status: "Permission Denied",
    message: message,
  };
};

const UNAUTHENTICATED = (message = "User is not authenticated.") => {
  return {
    code: 401,
    status: "UNAUTHENTICATED",
    message: message,
  };
};

module.exports = {
  OK,
  ERROR,
  NOT_FOUND,
  PERMISSION_DENIED,
  UNAUTHENTICATED,
};
