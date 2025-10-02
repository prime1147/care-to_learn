// services/DemoSession.service.js
const DemoSessionRepository = require("../repositories/DemoSession.repository"); // Will create this
const db = require('../models');
const User = db.User;
// If using Course:
// const Course = db.Course;

class DemoSessionService {
  constructor() {
    this.modelName = "DemoSession";
  }

  add = async (data) => {
    const demoSessionRepository = new DemoSessionRepository(this.modelName, data);
    return await demoSessionRepository.create();
  };

  getAll = async () => {
    return await db.DemoSession.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'full_name'] // Adjust attributes as needed from User model
      }
      // If course-specific:
      // ,{
      //   model: Course,
      //   as: 'course',
      //   attributes: ['id', 'title'] // Adjust attributes as needed from Course model
      // }
      ],
      order: [['created_at', 'DESC']]
    });
  };

  getById = async (id) => {
    return await db.DemoSession.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'full_name']
      }
      // If course-specific:
      // ,{
      //   model: Course,
      //   as: 'course',
      //   attributes: ['id', 'title']
      // }
      ]
    });
  };

  update = async (data, options) => {
    const demoSessionRepository = new DemoSessionRepository(this.modelName, data, options);
    return await demoSessionRepository.update();
  };

  delete = async (options) => {
    const demoSessionRepository = new DemoSessionRepository(this.modelName, null, options); // Data is null as delete uses options.where
    return await demoSessionRepository.delete();
  };
}

module.exports = new DemoSessionService();