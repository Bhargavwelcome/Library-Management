const borrowService = require("../services/borrow.service");

const borrowBook = async (req, res) => {
    try {
        const result = await borrowService.borrowBook(req.user.id, req.body.book_id);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const returnBook = async (req, res) => {
    try {
        const result = await borrowService.returnBook(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const borrowHistory = async (req, res) => {
    try {
        const result = await borrowService.borrowHistory(req.user.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    borrowBook,
    returnBook,
    borrowHistory
};