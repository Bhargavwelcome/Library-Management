const express = require("express");
const router = express.Router();

const borrowController = require("../controllers/borrow.controller");
const authenticate = require("../middleware/auth.middleware");

// Borrow a book
router.post("/", authenticate, borrowController.borrowBook);

// Return a book
router.put("/:id/return", authenticate, borrowController.returnBook);

// Logged-in user's borrow history
router.get("/history", authenticate, borrowController.borrowHistory);

module.exports = router;