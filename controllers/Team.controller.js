const TeamService = require("../services/Team.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
class TeamController {
  addTeam = async (req, res, next) => {
    try {
      const result = await TeamService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  getTeamById = async (req, res, next) => {
    try {
      let payload = {
        where: {
          id: req.params.id,
        },
      };
      const result = await TeamService.getById(payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  getTeamList = async (req, res, next) => {
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
      const result = await TeamService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };
  updateTeam = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      const result = await TeamService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
  deleteTeam = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const result = await TeamService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}
module.exports = new TeamController();
