const express = require("express");
const protect = require("../middleware/authMiddleWare");
const { getNotes, addNote } = require("../controllers/noteControllers");
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;
