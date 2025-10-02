const STATUS_CODE = require("./statusCodes");
module.exports = {
  respondGet: function (data = null, res = null) {
    return this.respond(
      {
        success: true,
        code: STATUS_CODE.HTTP_OK,
        message: "Ok",
        data: data,
      },
      res
    );
  },
  respondPost: function (data = null, res = null) {
    return this.respond(
      {
        success: true,
        code: STATUS_CODE.HTTP_CREATED,
        message: "Created",
        data: data,
      },
      res
    );
  },
  respondPut: function (data = null, res = null) {
    return this.respond(
      {
        success: true,
        code: STATUS_CODE.HTTP_ACCEPTED,
        message: "Data updated successfully",
        data: data,
      },
      res
    );
  },
  respondDelete: function (data=null,res = null) {
    return this.respond(
      {
        success: true,
        code: STATUS_CODE.HTTP_OK,
        message: "Data deleted successfully.",
      },
      res
    );
  },
  respondBad: function (message = "Bad Request", res = null) {
    return this.respond(
      {
        success: false,
        code: STATUS_CODE.HTTP_BAD_REQUEST,
        message: message,
        data: [],
      },
      res
    );
  },
  respondNotFound: function (message = "Data Not Found", res = null) {
    return this.respond(
      {
        success: false,
        code: STATUS_CODE.HTTP_NOT_FOUND,
        message: message,
        data: [],
      },
      res
    );
  },
  respondUnauthorized: function (message = "Invalid Token", res = null) {
    return this.respond(
      {
        success: false,
        code: STATUS_CODE.HTTP_UNAUTHORIZED,
        message: message,
        data: [],
      },
      res
    );
  },
  respondForbidden: function (message = "Forbidden", res = null) {
    return this.respond(
      {
        success: false,
        code: STATUS_CODE.HTTP_FORBIDDEN,
        message: message,
        data: [],
      },
      res
    );
  },

  respondError: function (err, res = null) {
    return this.respond(
      {
        success: false,
        code: STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
        message: err,
        data: [],
      },
      res
    );
  },

  respond: function (data, res) {
    if (res) {
      return res.status(data.code).send(data);
    }
    return data;
  },
};
