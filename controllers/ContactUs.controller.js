const response = require("../utils/response");
const { sendEmail } = require("../utils/commonFunction");
// const redis = require('../config/redisClient');
const Templates = require("../utils/emailTemplates");
require('dotenv').config()
const ContactUsService = require("../services/ContactUsService");
const {
  searchCondition,
  whereCondition,
} = require("../utils/conditionFilters");
const UserService = require("../services/User.service");


class ContactUs {

  async addContactUsMessage(req, res, next) {

    try {

      const { name, email, phone, type, message } = req.body;

      const savedMessage = await ContactUsService.add({

        name,

        email,

        phone,

        type,

        message,

      });

      const options = {

        where: {

          role: "ADMIN"

        }

      };

      const superAdmin = await UserService.getById(options);

      // Prepare email content using your Templates system

      const mailOptions = {

        to: superAdmin.email, // authorized email

        from: `"${name}" <${email}>`,

        subject: "📩 New Contact Us Message",

        html: Templates.contactUsTemplate({ name, email, phone, type, message })

      };



      const mailResponse = await sendEmail(mailOptions);

      if (!mailResponse) {

        return response.respondBad("Failed to send message", res);

      }

      //send response email to user

      const responseMailOptions = {

        to: email,

        subject: "Thank You for Contacting Us",

        html: Templates.contactUsResponseTemplate({ name, type }),

      };

      const responseMailResponse = await sendEmail(responseMailOptions);

      if (!responseMailResponse) {

        return response.respondBad("Failed to send response message", res);

      }

      return response.respondPost(

        { message: "Message saved successfully", data: savedMessage },

        res

      );

    } catch (error) {

      console.log("Contact Us Error:", error);

      return response.respondError(error, res);

    }

  }
  async listMessages(req, res) {
    try {
      let { keyword, page = 1, limit = 10 } = req.query;

      // ensure numeric
      page = Number(page);
      take = Number(limit);
      const skip = take * page - take;

      // build search condition
      let WhereConditions = {};
      if (keyword) {
        WhereConditions = {
          ...searchCondition(keyword, "name", "email", "message"),
        };
      }

      const options = {
        where: WhereConditions,
        take,
        skip,
      };

      const result = await ContactUsService.findAllAndCount(options);

      return response.respondGet(
        {
          count: result.count,
          rows: result.rows,
          page,
          take,
        },
        res
      );
    } catch (error) {
      console.error("List ContactUs Error:", error);
      return response.respondError(error, res);
    }
  }
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await ContactUsService.put(
        { status },
        { where: { id } }
      );

      if (!updated) {
        return response.respondNotFound("Message not found", res);
      }

      return response.respondGet(
        { message: "Status updated successfully", data: updated },
        res
      );
    } catch (error) {
      console.error("Update Status Error:", error);
      return response.respondError(error, res);
    }
  }
}



module.exports = new ContactUs();
