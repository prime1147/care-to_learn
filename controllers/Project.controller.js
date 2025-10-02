const ProjectService = require("../services/Project.service");
const response = require("../utils/response");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");

class ProjectController {
  addProject = async (req, res, next) => {
    try {
      const result = await ProjectService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };

  getProjectById = async (req, res, next) => {
    try {
      const payload = {
        where: {
          id: req.params.id,
        },
      };
      const result = await ProjectService.getById(payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };

  getProjectList = async (req, res, next) => {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;
      let WhereConditions;

      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "title"),
        };
      }

      page = Number(page);
      limit = Number(limit);
      const offset = limit * page - limit;

      const options = {
        where: WhereConditions,
        limit,
        offset,
      };

      const result = await ProjectService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.log("error: ", error);
      return response.respondError(error, res);
    }
  };

  updateProject = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      const result = await ProjectService.put(req.body, payload);
      return response.respondGet(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };

  deleteProject = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.params.id },
      };
      const result = await ProjectService.delete(payload);
      return response.respondDelete(result, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  };
}

module.exports = new ProjectController();
