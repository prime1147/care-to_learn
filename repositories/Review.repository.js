// repositories/Review.repository.js
const CommonRepository = require("./Common.repository"); 

class ReviewRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }
}

module.exports = ReviewRepository;