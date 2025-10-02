const CommonRepository = require("./Common.repository");

class TeamRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = TeamRepository;
