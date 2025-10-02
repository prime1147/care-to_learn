const OrganisationRepository = require("../repositories/Organisation.repository");

class OrganisationService {
  constructor() {
    this.model = "Organisation";
  }

  add = async (data) => {
    const organisationschemaRepository = new OrganisationRepository(
      this.model,
      data
    );
    return await organisationschemaRepository.create();
  };

  get = (data) => {
    const organisationschemaRepository = new OrganisationRepository(
      this.model,
      data
    );
    return organisationschemaRepository.getAll();
  };

  getById = (data) => {
    const organisationschemaRepository = new OrganisationRepository(
      this.model,
      data
    );
    return organisationschemaRepository.get();
  };

  put = async (data, options) => {
    const organisationschemaRepository = new OrganisationRepository(
      this.model,
      data,
      options
    );
    return await organisationschemaRepository.update();
  };

  delete = async (data) => {
    const organisationschemaRepository = new OrganisationRepository(
      this.model,
      data
    );
    return await organisationschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const organisationschemaRepository = new OrganisationRepository(
      this.model,
      data
    );
    return organisationschemaRepository.findAllAndCount();
  };
  count = () => {
    const organisationschemaRepository = new OrganisationRepository(this.model);
    return organisationschemaRepository.count();
  };
}

module.exports = new OrganisationService();
