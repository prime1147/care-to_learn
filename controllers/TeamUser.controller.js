const TeamUserService = require("../services/TeamUser.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
class TeamUserController {
  addTeamUser = async (req, res, next) => {
    try {
      const result = await TeamUserService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getTeamUserById = async (req, res, next) => {
    try {
      let payload = {
        where: {
          id: req.params.id,
        },
      };
      const result = await TeamUserService.getById(payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  getTeamUserList = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;
      let WhereConditions;
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "fullName"),
        };
      }
      page = Number(page);
      limit = Number(limit);
      let offset = limit * page - limit;
      const options = {
        where: WhereConditions,
        limit: limit,
        offset: offset,
      };
      const result = await TeamUserService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  deleteTeamUser = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const result = await TeamUserService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new TeamUserController();
