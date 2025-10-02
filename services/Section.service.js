const SectionRepository = require("../repositories/Section.repository");

class SectionService {
  constructor() {
    this.model = "Section";
  }

  add = async (data) => {
    const sectionschemaRepository = new SectionRepository(this.model, data);
    return await sectionschemaRepository.create();
  };

  get = (data) => {
    const sectionschemaRepository = new SectionRepository(this.model, data);
    return sectionschemaRepository.getAll();
  };

  getById = (data) => {
    const sectionschemaRepository = new SectionRepository(this.model, data);
    return sectionschemaRepository.get();
  };

  put = async (data, options) => {
    const sectionschemaRepository = new SectionRepository(
      this.model,
      data,
      options
    );
    return await sectionschemaRepository.update();
  };

  delete = async (data) => {
    const sectionschemaRepository = new SectionRepository(this.model, data);
    return await sectionschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const sectionschemaRepository = new SectionRepository(this.model, data);
    return sectionschemaRepository.findAllAndCount();
  };
}

module.exports = new SectionService();
