const CommonRepository = require("./Common.repository"); // assuming you have a generic one

class ContactUsRepository extends CommonRepository {
   constructor(model, data, options = {}) {
    super(model, data, options);
  }
}

module.exports = ContactUsRepository;

