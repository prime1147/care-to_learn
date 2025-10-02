const TeamUserRepository = require("../repositories/TeamUser.repository");

class TeamUserService {
  constructor() {
    this.model = "TeamUser";
  }

  add = async (data) => {
    const teamuserschemaRepository = new TeamUserRepository(this.model, data);
    return await teamuserschemaRepository.create();
  };

  get = (data) => {
    const teamuserschemaRepository = new TeamUserRepository(this.model, data);
    return teamuserschemaRepository.getAll();
  };

  getById = (data) => {
    const teamuserschemaRepository = new TeamUserRepository(this.model, data);
    return teamuserschemaRepository.get();
  };

  put = async (data, options) => {
    const teamuserschemaRepository = new TeamUserRepository(
      this.model,
      data,
      options
    );
    return await teamuserschemaRepository.update();
  };

  delete = async (data) => {
    const teamuserschemaRepository = new TeamUserRepository(this.model, data);
    return await teamuserschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const teamuserschemaRepository = new TeamUserRepository(this.model, data);
    return teamuserschemaRepository.findAllAndCount();
  };
}

module.exports = new TeamUserService();
