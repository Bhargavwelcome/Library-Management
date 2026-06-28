const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Admin only
router.post("/", authenticate, authorize("admin"), bookController.addBook);
router.put("/:id", authenticate, authorize("admin"), bookController.updateBook);
router.delete("/:id", authenticate, authorize("admin"), bookController.deleteBook);

// All logged-in users
router.get("/", authenticate, bookController.getAllBooks);
router.get("/:id", authenticate, bookController.getBookById);

module.exports = router;