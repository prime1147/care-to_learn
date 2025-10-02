const CommonRepository = require("./Common.repository");

class CourseRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = CourseRepository;
