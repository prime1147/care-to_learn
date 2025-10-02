const TeamRepository = require("../repositories/Team.repository");

class TeamService {
  constructor() {
    this.model = "Team";
  }

  add = async (data) => {
    const teamschemaRepository = new TeamRepository(this.model, data);
    return await teamschemaRepository.create();
  };

  get = (data) => {
    const teamschemaRepository = new TeamRepository(this.model, data);
    return teamschemaRepository.getAll();
  };

  getById = (data) => {
    const teamschemaRepository = new TeamRepository(this.model, data);
    return teamschemaRepository.get();
  };

  put = async (data, options) => {
    const teamschemaRepository = new TeamRepository(
      this.model,
      data,
      options
    );
    return await teamschemaRepository.update();
  };

  delete = async (data) => {
    const teamschemaRepository = new TeamRepository(this.model, data);
    return await teamschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const teamschemaRepository = new TeamRepository(this.model, data);
    return teamschemaRepository.findAllAndCount();
  };
}

module.exports = new TeamService();
