const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/profile", authMiddleware, getUserProfile);


router.patch("/profile/update", authMiddleware, updateUserProfile);

module.exports = router;
