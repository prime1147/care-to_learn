const response = require("../utils/response");
const FAQService = require("../services/Faq.service");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");

class FAQController {
  async addFAQ(req, res) {
    try {
      const faq = await FAQService.add(req.body);
      return response.respondPost(faq, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  }

  async getFAQList(req, res) {
    try {
      let { page, limit, keyword, isActive } = req.query;

      page = Number(page);
      let take = Number(limit);
      const skip = (page - 1) * limit;

      let where = {};

      // 🔎 keyword search like in getCourseList
      if (keyword) {
        where = {
          ...searchCondition(keyword, "question", "answer"),
        };
      }

      if (isActive === "true") {
        where.isActive = true;
      } else if (isActive === "false") {
        where.isActive = false;
      }

      const result = await FAQService.findAllAndCount({
        where,
        take,
        skip,
      });

      return response.respondGet(
        {
          count: result.count,
          page,
          limit,
          rows: result.rows,
        },
        res
      );
    } catch (error) {
      console.error("FAQ List Error:", error);
      return response.respondError(error, res);
    }
  }

  async getFAQById(req, res) {
    try {
      const faq = await FAQService.getById({ where: { id: req.params.id } });
      if (!faq) return response.respondNotFound("FAQ not found", res);

      return response.respondGet(faq, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  }

  async updateFAQ(req, res) {
    try {
      req.body.isActive = req.body.isActive.toUpperCase();
      delete req.body.id;
      const updated = await FAQService.update(req.body, {
        where: { id: req.body.id },
      });
      return response.respondPost(updated, res);
    } catch (error) {
      return response.respondError(error, res);
    }
  }

  async deleteFAQ(req, res) {
    try {

      const result = await FAQService.delete({ where: { id: req.params.id } });
      return response.respondDelete(result, res);
    } catch (error) {
      console.log('error:2 ', error);
      return response.respondError(error, res);
    }
  }

  async toggleFAQStatus(req, res) {
    try {
      console.log("req: ", req.body.id);
      // delete req.body.id;
      const faq = await FAQService.getById({ where: { id: req.body.id } });
      if (!faq) return response.respondNotFound("FAQ not found", res);

      faq.isActive = !faq.isActive;
      await FAQService.update(faq, { where: { id: req.body.id } });

      return response.respondPost(faq, res);
    } catch (error) {
      console.log('error: ', error);
      return response.respondError(error, res);
    }
  }
}

module.exports = new FAQController();
