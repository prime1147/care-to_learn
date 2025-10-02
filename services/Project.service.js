const ProjectRepository = require("../repositories/Project.repository");

class ProjectService {
  constructor() {
    this.model = "Project";
  }

  add = async (data) => {
    const projectRepository = new ProjectRepository(this.model, data);
    return await projectRepository.create();
  };

  get = (data) => {
    const projectRepository = new ProjectRepository(this.model, data);
    return projectRepository.getAll();
  };

  getById = (data) => {
    const projectRepository = new ProjectRepository(this.model, data);
    return projectRepository.get();
  };

  put = async (data, options) => {
    const projectRepository = new ProjectRepository(this.model, data, options);
    return await projectRepository.update();
  };

  delete = async (data) => {
    const projectRepository = new ProjectRepository(this.model, data);
    return await projectRepository.delete();
  };

  findAllAndCount = (data) => {
    const projectRepository = new ProjectRepository(this.model, data);
    return projectRepository.findAllAndCount();
  };
}

module.exports = new ProjectService();
