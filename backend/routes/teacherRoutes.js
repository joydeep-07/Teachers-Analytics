const express = require("express");

const {
  getTeachers,
  getTeacherProfile,
  registerTeacher,
  getTeacherById,
  updateTeacher,
} = require("../controllers/teacherController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, admin, getTeachers)
  .post(protect, admin, registerTeacher);

router.route("/profile").get(protect, getTeacherProfile);

router
  .route("/:id")
  .get(protect, admin, getTeacherById)
  .put(protect, admin, updateTeacher);

module.exports = router;
