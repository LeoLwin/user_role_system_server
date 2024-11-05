const OK = (data, message) => {
  return {
    code: 200,
    message: message ? message : "Success",
    data: data,
  };
};

const ERROR = (message = "SERVER ERROR") => {
  return {
    code: 400,
    message: message,
  };
};

const NOT_FOUND = (message = " NOT FOUND") => {
  return {
    code: 404,
    message: message,
  };
};

module.exports = {
  OK,
  ERROR,
  NOT_FOUND,
};
