const CommonRepository = require("./Common.repository");

class CourseTopicRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = CourseTopicRepository;
