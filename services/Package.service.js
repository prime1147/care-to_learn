const PackageRepository = require("../repositories/Package.repository");

class PackageService {
  constructor() {
    this.model = "Package";
  }

  add = async (data) => {
    const packageschemaRepository = new PackageRepository(this.model, data);
    return await packageschemaRepository.create();
  };

  get = (data) => {
    const packageschemaRepository = new PackageRepository(this.model, data);
    return packageschemaRepository.getAll();
  };

  getById = (data) => {
    const packageschemaRepository = new PackageRepository(this.model, data);
    return packageschemaRepository.get();
  };

  put = async (data, options) => {
    const packageschemaRepository = new PackageRepository(
      this.model,
      data,
      options
    );
    return await packageschemaRepository.update();
  };

  delete = async (data) => {
    const packageschemaRepository = new PackageRepository(this.model, data);
    return await packageschemaRepository.delete();
  };

  findAllAndCount = (data) => {
    const packageschemaRepository = new PackageRepository(this.model, data);
    return packageschemaRepository.findAllAndCount();
  };
  count = () => {
    const packageschemaRepository = new PackageRepository(this.model);
    return packageschemaRepository.count();
  };
}

module.exports = new PackageService();
