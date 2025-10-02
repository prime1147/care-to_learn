const ContactUsRepository = require("../repositories/ContactUs.repository");

class FAQService {
  constructor() {
    this.model = "FAQ";
  }

  add = async (data) => {
    const faqrepo = new ContactUsRepository(this.model, data);
    return faqrepo.create();
  };

  get = (data) => {
    const faqrepo = new ContactUsRepository(this.model, data);
    return faqrepo.getAll();
  };

  getById = (data) => {
    const faqrepo = new ContactUsRepository(this.model, data);
    return faqrepo.get();
  };

  update = async (data, options) => {
    const faqrepo = new ContactUsRepository(this.model, data, options);
    return faqrepo.update();
  };

  delete = async (data) => {
    const faqrepo = new ContactUsRepository(this.model, data);
    return faqrepo.delete();
  };

  findAllAndCount = (data) => {
    const faqrepo = new ContactUsRepository(this.model, data);
    return faqrepo.findAllAndCount();
  };
}

module.exports = new FAQService();
