const CommonRepository = require("./Common.repository");

class UserRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = UserRepository;
