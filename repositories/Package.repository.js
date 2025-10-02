const CommonRepository = require("./Common.repository");

class PackageRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}
module.exports = PackageRepository;
