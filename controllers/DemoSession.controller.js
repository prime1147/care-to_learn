const DemoSessionService = require("../services/DemoSession.service");
const response = require("../utils/response");

class DemoSessionController {
  // Book a new demo session
  bookDemo = async (req, res, next) => {
    try {
      const { full_name, email, phone_number, preferred_date, preferred_time, message, course_id } = req.body;
      // console.log(req.userDetails.id)
      const userId = req.userDetails.id;
      const demoData = {
        user_id: userId,
        full_name,
        email,
        phone_number,
        preferred_date,
        preferred_time,
        message,
        status: 'pending',
      };

      const result = await DemoSessionService.add(demoData);
      return response.respondPost({
        ...result,
        message: "Demo session request submitted successfully!",
      }, res);
    } catch (error) {
      console.error("Error booking demo session: ", error);
      return response.respondError(error, res);
    }
  };

  // Get all demo sessions (Admin only)
  getAllDemoSessions = async (req, res, next) => {
    try {
      const demoSessions = await DemoSessionService.getAll();
      return response.respondGet(demoSessions, res);
    } catch (error) {
      console.error("Error fetching demo sessions: ", error);
      return response.respondError(error, res);
    }
  };

  // Get a single demo session by ID (Admin only)
  getDemoSessionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const demoSession = await DemoSessionService.getById(id);
      if (!demoSession) {
        return response.respondNotFound("Demo session not found", res);
      }
      return response.respondGet(demoSession, res);
    } catch (error) {
      console.error("Error fetching demo session by ID: ", error);
      return response.respondError(error, res);
    }
  };

  // Update a demo session (e.g., status, Admin only)
  updateDemoSession = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body; // Can include status, date, time, etc.

      const result = await DemoSessionService.update(updateData, { where: { id } });

      if (result) {
        const updatedDemo = await DemoSessionService.getById(id);
        return response.respondUpdate(updatedDemo, res);
      } else {
        return response.respondNotFound("Demo session not found or no changes made", res);
      }
    } catch (error) {
      console.error("Error updating demo session: ", error);
      return response.respondError(error, res);
    }
  };

  // Delete a demo session (Admin only)
  deleteDemoSession = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await DemoSessionService.delete({ where: { id } });
      if (result) {
        return response.respondDelete("Demo session deleted successfully", res);
      } else {
        return response.respondNotFound("Demo session not found", res);
      }
    } catch (error) {
      console.error("Error deleting demo session: ", error);
      return response.respondError(error, res);
    }
  };
}

module.exports = new DemoSessionController();