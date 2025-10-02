const UserRepository = require("../repositories/User.repository");

class UserService {
  constructor() {
    this.model = "User";
  }

  add = async (data) => {
    const userRepository = new UserRepository(this.model, data);
    return await userRepository.create();
  };

  get = (data) => {
    const userRepository = new UserRepository(this.model, data);
    return userRepository.getAll();
  };

  getById = (data) => {
    const userRepository = new UserRepository(this.model, data);
    return userRepository.get();
  };

  put = async (data, options) => {
    const userRepository = new UserRepository(this.model, data, options);
    return await userRepository.update();
  };

  delete = async (data) => {
    const userRepository = new UserRepository(this.model, data);
    return await userRepository.delete();
  };

  findAllAndCount = (data) => {
    const userRepository = new UserRepository(this.model, data);
    return userRepository.findAllAndCount();
  };
  count = () => {
    const userRepository = new UserRepository(this.model);
    return userRepository.count();
  };
}

module.exports = new UserService();
