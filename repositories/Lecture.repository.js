const CommonRepository = require("./Common.repository");

class LectureRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = LectureRepository;
