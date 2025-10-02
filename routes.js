const userRoutes = require("./routes/User.route");
const authRoutes = require("./routes/Auth.route");
const courseRoutes = require("./routes/Course.route");
const courseUserRoutes = require("./routes/CourseUser.route");
const teamRoutes = require("./routes/Team.route");
const teamUserRoutes = require("./routes/TeamUser.route");
const CourseTopicRoutes = require("./routes/CourseTopic.route");
const projectRoutes = require("./routes/Project.route");
const reviewRoutes = require("./routes/Review.route");
const demoSessionRoutes = require("./routes/demoSession.routes");
const SectionRoutes = require("./routes/Section.route");
const LectureRoutes = require("./routes/Lecture.route");
const fileRoutes = require("./routes/FileDocument.route");
const packageRoutes = require("./routes/Package.route");
const organisationRoutes = require("./routes/Organisation.route");
const contactUsRoutes = require("./routes/ContactUs.route");
const faqsRoutes = require("./routes/Faq.routes")
class Routes {
  constructor(app) {
    this.app = app;
    this.init();
  }
  init() {
    this.app.use("/api/v1", authRoutes);
    this.app.use("/api/v1/courses", courseRoutes);
    this.app.use("/api/v1/coursetopics", CourseTopicRoutes);
    this.app.use("/api/v1/courseusers", courseUserRoutes);
    this.app.use("/api/v1/teams", teamRoutes);
    this.app.use("/api/v1/teamusers", teamUserRoutes);
    this.app.use("/api/v1/users", userRoutes);
    this.app.use("/api/v1/projects", projectRoutes);
    this.app.use("/api/v1/reviews", reviewRoutes);
    this.app.use("/api/v1/demo-sessions", demoSessionRoutes);
    this.app.use("/api/v1/sections", SectionRoutes);
    this.app.use("/api/v1/lectures", LectureRoutes);
    this.app.use("/api/v1/files", fileRoutes);
    this.app.use("/api/v1/packages", packageRoutes);
    this.app.use("/api/v1/organisations", organisationRoutes);
    this.app.use("/api/v1/contactus", contactUsRoutes);
    this.app.use("/api/v1/faq", faqsRoutes);
  }
}
module.exports = Routes;
