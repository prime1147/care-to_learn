const ReviewRepository = require("../repositories/Review.repository");

class ReviewService {
  constructor() {
    this.model = "Review";
  }

  add = async (data) => {
    const repo = new ReviewRepository(this.model, data);
    return await repo.create();
  };

  get = async (data) => {
    const repo = new ReviewRepository(this.model, data);
    return await repo.getAll();
  };

  getById = async (data) => {
    const repo = new ReviewRepository(this.model, data);
    return await repo.get();
  };

  put = async (data, options) => {
    const repo = new ReviewRepository(this.model, data, options);
    return await repo.update();
  };

  delete = async (data) => {
    const repo = new ReviewRepository(this.model, data);
    return await repo.delete();
  };

  findAllAndCount = (data) => {
    const repo = new ReviewRepository(this.model, data);
    return repo.findAllAndCount();
  };

  // ✅ Approve review (set isApproved = true)
  approve = async (id) => {
    const repo = new ReviewRepository(
      this.model,
      { isApproved: true },
      { where: { id }, returning: true }
    );
    const [rowsUpdated, [updatedReview]] = await repo.update();
    return rowsUpdated > 0 ? updatedReview : null;
  };
  count = () => {
    const repo = new ReviewRepository(this.model);
    return repo.count();
  };
}

module.exports = new ReviewService();
