const UserService = require("../services/User.service");
const CourseService = require("../services/Course.service");
const OrganisationService = require("../services/Organisation.service");
const ReviewService = require("../services/Review.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
const FileDocumentController = require("../controllers/FileDocument.controller"); // ✅ import once
const { getCachedPresignedUrl } = require("../utils/commonFunction");
class UserController {
  signupUser = async (req, res, next) => {
    try {
      if (!req.body.role) {
        req.body.role = "STUDENT"; // Default to Student
      }
      const result = await UserService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("🚀 ~ UserController ~ error:", error.name);
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          code: 400,
          message:
            "Email address is already in use. Please use a different one.",
        });
      }
      return response.respondError(error, res);
    }
  };
  getUserById = async (req, res, next) => {
    try {
      let payload = {
        where: {
          id: req.params.id,
        },
      };
      const result = await UserService.getById(payload);

      if (!result) {
        return response.respondNotFound("User not found", res);
      }

      // fields considered for profile completion
      const profileFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "designation",
        "profilePicture",
        "bio",
        "country",
        "city",
        "state",
        "postalCode",
        "taxId",
        "facebook",
        "xcom",
        "linkedin",
        "instagram",
      ];

      const totalFields = profileFields.length;
      let filled = 0;

      profileFields.forEach((field) => {
        if (result[field] && result[field] !== "" && result[field] !== null) {
          filled++;
        }
      });

      const completionPercentage = Math.round((filled / totalFields) * 100);
      if (result.ProfilePicture) {
        result.ProfilePicture = await getCachedPresignedUrl(
          FileDocumentController,
          result.ProfilePicture,
          300 // 5 mins standard expiry
        );
      }

      return response.respondGet(
        {
          ...result,
          profileCompletion: completionPercentage,
        },
        res
      );
    } catch (error) {
      return response.respondError(error, res);
    }
  };

  getUserList1 = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;
      let WhereConditions;
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "FirstName", "LastName", "email"),
        };
      }
      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;
      const options = {
        where: WhereConditions,
        take: limit,
        skip: offset,
      };
      const result = await UserService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getUserList = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "firstName", "lastName", "email"),
        };
      }

      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;

      const options = {
        where: WhereConditions,
        take: limit,
        skip: offset,
      };

      const result = await UserService.findAllAndCount(options);
      console.log("result: ", result);
      // fields considered for profile completion
      const profileFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "designation",
        "profilePicture",
        "bio",
        "country",
        "city",
        "state",
        "postalCode",
        "taxId",
        "facebook",
        "xcom",
        "linkedin",
        "instagram",
      ];

      // calculate percentage for each user
      const rowsWithCompletion = result.rows.map((user) => {
        const totalFields = profileFields.length;
        let filled = 0;

        profileFields.forEach((field) => {
          if (user[field] && user[field] !== "" && user[field] !== null) {
            filled++;
          }
        });

        const completionPercentage = Math.round((filled / totalFields) * 100);

        return {
          ...user,
          profileCompletion: completionPercentage,
        };
      });

      return response.respondGet(
        { count: result.count, rows: rowsWithCompletion },
        res
      );
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };

  getOrganisationsUserList = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;
      let WhereConditions = {
        organisationId: req.userDetails.id,
      };
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "firstName", "lastName", "email", "organisationName"),
        };
      }

      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;

      const options = {
        where: WhereConditions,
        take: limit,
        skip: offset,
      };

      const result = await UserService.findAllAndCount(options);

      // fields considered for profile completion
      const profileFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "designation",
        "profilePicture",
        "bio",
        "country",
        "city",
        "state",
        "postalCode",
      ];

      // calculate percentage for each user
      const rowsWithCompletion = result.rows.map((user) => {
        const totalFields = profileFields.length;
        let filled = 0;

        profileFields.forEach((field) => {
          if (user[field] && user[field] !== "" && user[field] !== null) {
            filled++;
          }
        });

        const completionPercentage = Math.round((filled / totalFields) * 100);

        return {
          ...user,
          profileCompletion: completionPercentage,
        };
      });

      return response.respondGet(
        { count: result.count, rows: rowsWithCompletion },
        res
      );
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getUsers = async (req, res, next) => {
    try {
      let { keyword } = req.query;
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "firstName", "lastName", "email"),
        };
      }
      const options = {
        where: WhereConditions,
        // attributes: ["id", "firstName", "lastName"],
      };

      const result = await UserService.findAllAndCount(options);

      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getTotalcount = async (req, res, next) => {
    try {
      const totalUsers = await UserService.count({});
      const totalCourses = await CourseService.count({});
      const totalOrganisations = await OrganisationService.count({});
      const totalReviews = await ReviewService.count({});
      return response.respondGet(
        { totalUsers, totalCourses, totalOrganisations, totalReviews },
        res
      );
    } catch (error) {
      console.log("🚀 ~TOTAL COUNT UserController ~ error:", error);
      return response.respondError(error, res);
    }
  };
  updateUser = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      const options = {
        where: { id: req.body.id },
      };
      delete req.body.id;
      const findUser = await UserService.getById(payload);
      if (!findUser) {
        return response.respondNotFound("User not found", res);
      }

      const result = await UserService.put(req.body, options);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  updateUserStatus = async (req, res, next) => {
    try {
      console.log("🚀 ~ UserController ~ req.body:", req.body);
      const payload = {
        where: { id: req.body.id },
      };
      req.body.status = req.body.status.toUpperCase();
      const findUser = await UserService.getById(payload);
      console.log("🚀 ~ UserController ~ !findUser:", findUser);
      if (!findUser) {
        return response.respondNotFound("User not found", res);
      }
      console.log("Payload in: ", payload);
      const result = await UserService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  deleteUser = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      delete req.body.id;
      const findUser = await UserService.getById(payload);
      if (!findUser) {
        return response.respondNotFound("User not found", res);
      }
      const result = await UserService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  // /*
  addSuperAdmin = async (req, res, next) => {
    try {
      // if (process.env.ADDSUPERADMIN == "true") {
      const result = await UserService.add(req.body);
      return response.respondPost(result, res);
      //  } else {
      //   return response.respondError(
      //     "You do not have permission to add a superadmin.",
      //     res
      //   );
      // }
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  // */
}

module.exports = new UserController();
