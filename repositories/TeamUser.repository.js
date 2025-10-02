const CommonRepository = require("./Common.repository");

class TeamUserRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = TeamUserRepository;
