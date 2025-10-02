const LectureRepository = require("../repositories/Lecture.repository");

class LectureService {
  constructor() {
    this.model = "Lecture";
  }

  add = async (data) => {
    const lectureschemaRepository = new LectureRepository(this.model, data);
    return await lectureschemaRepository.create();
  };

  get = (data) => {
    const lectureschemaRepository = new LectureRepository(this.model, data);
    return lectureschemaRepository.getAll();
  };

  getById = (data) => {
    const lectureschemaRepository = new LectureRepository(this.model, data);
    return lectureschemaRepository.get();
  };

  put = async (data, options) => {
    const lectureschemaRepository = new LectureRepository(
      this.model,
      data,
      options
    );
    return await lectureschemaRepository.update();
  };

  delete = async (data) => {
    const lectureschemaRepository = new LectureRepository(this.model, data);
    return await lectureschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const lectureschemaRepository = new LectureRepository(this.model, data);
    return lectureschemaRepository.findAllAndCount();
  };
}

module.exports = new LectureService();
