// repositories/DemoSession.repository.js
const CommonRepository = require("./Common.repository");

class DemoSessionRepository extends CommonRepository {
  constructor(model, data, options = {}) {
    super(model, data, options);
  }

  // If the 'defaultScope' in the model doesn't fully solve the RETURNING issue for DemoSession,
  // you might need to override the 'create' method specifically here, similar to what we discussed for Review.
  // Example (uncomment if necessary):
  // create = async () => {
  //   return await models[this.model].create(this.data, {
  //     returning: true,
  //     attributes: [
  //       'id', 'user_id', 'full_name', 'email', 'phone_number',
  //       'preferred_date', 'preferred_time', 'message', 'status', 'created_at', 'updated_at'
  //     ]
  //   });
  // };
}

module.exports = DemoSessionRepository;