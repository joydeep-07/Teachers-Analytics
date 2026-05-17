const express = require("express");
const { authUser, logoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", authUser);
router.post("/logout", logoutUser);

// ADD THIS
router.get("/me", (req, res) => {
  res.status(200).json({
    success: true,
    user: null,
  });
});

module.exports = router;
