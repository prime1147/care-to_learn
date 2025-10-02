const CommonRepository = require("./Common.repository");

class CourseUserRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = CourseUserRepository;
