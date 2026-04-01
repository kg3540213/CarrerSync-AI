const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  resource_id: { type: String, required: true },
  progress: { type: Number, default: 0 }
});

module.exports = mongoose.model("EnrolledCourse", enrolledCourseSchema);
