const CommonRepository = require("./Common.repository");

class SectionRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = SectionRepository;
