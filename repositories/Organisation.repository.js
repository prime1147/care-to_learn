const CommonRepository = require("./Common.repository");

class OrganisationRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = OrganisationRepository;
