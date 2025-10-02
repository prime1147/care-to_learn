const CourseRepository = require("../repositories/Course.repository");

class CourseService {
  constructor() {
    this.model = "Course";
  }

  add = async (data) => {
    const courseschemaRepository = new CourseRepository(this.model, data);
    return await courseschemaRepository.create();
  };

  get = (data) => {
    const courseschemaRepository = new CourseRepository(this.model, data);
    return courseschemaRepository.getAll();
  };

  getById = (data) => {
    const courseschemaRepository = new CourseRepository(this.model, data);
    return courseschemaRepository.get();
  };

  put = async (data, options) => {
    const courseschemaRepository = new CourseRepository(
      this.model,
      data,
      options
    );
    return await courseschemaRepository.update();
  };

  delete = async (data) => {
    const courseschemaRepository = new CourseRepository(this.model, data);
    return await courseschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const courseschemaRepository = new CourseRepository(this.model, data);
    return courseschemaRepository.findAllAndCount();
  };
    count = () => {
    const courseschemaRepository = new CourseRepository(this.model);
    return courseschemaRepository.count();
  };
}

module.exports = new CourseService();
