const CourseTopicRepository = require("../repositories/CourseTopic.repository");

class CourseTopicService {
  constructor() {
    this.model = "CourseTopic";
  }

  add = async (data) => {
    const coursetopicschemaRepository = new CourseTopicRepository(
      this.model,
      data
    );
    return await coursetopicschemaRepository.create();
  };

  get = (data) => {
    const coursetopicschemaRepository = new CourseTopicRepository(
      this.model,
      data
    );
    return coursetopicschemaRepository.getAll();
  };

  getById = (data) => {
    const coursetopicschemaRepository = new CourseTopicRepository(
      this.model,
      data
    );
    return coursetopicschemaRepository.get();
  };

  put = async (data, options) => {
    const coursetopicschemaRepository = new CourseTopicRepository(
      this.model,
      data,
      options
    );
    return await coursetopicschemaRepository.update();
  };

  delete = async (data) => {
    const coursetopicschemaRepository = new CourseTopicRepository(
      this.model,
      data
    );
    return await coursetopicschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const coursetopicschemaRepository = new CourseTopicRepository(
      this.model,
      data
    );
    return coursetopicschemaRepository.findAllAndCount();
  };
}

module.exports = new CourseTopicService();
