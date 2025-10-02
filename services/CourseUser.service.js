const CourseUserRepository = require("../repositories/CourseUser.repository");

class CourseUserService {
  constructor() {
    this.model = "CourseUser";
  }

  add = async (data) => {
    const courseuserschemaRepository = new CourseUserRepository(this.model, data);
    return await courseuserschemaRepository.create();
  };

  get = (data) => {
    const courseuserschemaRepository = new CourseUserRepository(this.model, data);
    return courseuserschemaRepository.getAll();
  };

  getById = (data) => {
    const courseuserschemaRepository = new CourseUserRepository(this.model, data);
    return courseuserschemaRepository.get();
  };

  put = async (data, options) => {
    const courseuserschemaRepository = new CourseUserRepository(
      this.model,
      data,
      options
    );
    return await courseuserschemaRepository.update();
  };

  delete = async (data) => {
    const courseuserschemaRepository = new CourseUserRepository(this.model, data);
    return await courseuserschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const courseuserschemaRepository = new CourseUserRepository(this.model, data);
    return courseuserschemaRepository.findAllAndCount();
  };
}

module.exports = new CourseUserService();
