const ContactUsRepository = require("../repositories/ContactUs.repository");

class ContactUsService {
  constructor() {
    this.model = "ContactUs";
  }

  add = async (data) => {
    const contactRepo = new ContactUsRepository(this.model, data);
    return await contactRepo.create();
  };

  get = (data) => {
    const contactRepo = new ContactUsRepository(this.model, data);
    return contactRepo.getAll();
  };

  getById = (data) => {
    const contactRepo = new ContactUsRepository(this.model, data);
    return contactRepo.get();
  };

  put = async (data, options) => {
    const contactRepo = new ContactUsRepository(this.model, data, options);
    return await contactRepo.update();
  };

  delete = async (data) => {
    const contactRepo = new ContactUsRepository(this.model, data);
    return await contactRepo.delete();
  };

 findAllAndCount = async (data) => {
  const contactRepo = new ContactUsRepository(this.model, data);
  return await  contactRepo.findAllAndCount();
};
}

module.exports = new ContactUsService();
