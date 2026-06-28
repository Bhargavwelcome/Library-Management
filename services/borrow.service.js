const pool = require("../db/pool");

// Borrow Book
const borrowBook = async (userId, bookId) => {

    const book = await pool.query(
        "SELECT * FROM books WHERE id=$1",
        [bookId]
    );

    if (book.rows.length === 0)
        throw new Error("Book not found");

    if (book.rows[0].available_quantity <= 0)
        throw new Error("Book not available");

    await pool.query(
        "INSERT INTO borrow_records(user_id, book_id) VALUES($1,$2)",
        [userId, bookId]
    );

    await pool.query(
        "UPDATE books SET available_quantity = available_quantity - 1 WHERE id=$1",
        [bookId]
    );

    return {
        message: "Book Borrowed Successfully"
    };
};

// Return Book
const returnBook = async (borrowId) => {

    const record = await pool.query(
        "SELECT * FROM borrow_records WHERE id=$1",
        [borrowId]
    );

    if (record.rows.length === 0)
        throw new Error("Borrow record not found");

    await pool.query(
        `UPDATE borrow_records
         SET returned_at = CURRENT_TIMESTAMP,
             status='RETURNED'
         WHERE id=$1`,
        [borrowId]
    );

    await pool.query(
        `UPDATE books
         SET available_quantity = available_quantity + 1
         WHERE id=$1`,
        [record.rows[0].book_id]
    );

    return {
        message: "Book Returned Successfully"
    };
};

// Borrow History
const borrowHistory = async (userId) => {

    const result = await pool.query(
        `SELECT
            br.id,
            b.title,
            b.author,
            br.borrowed_at,
            br.returned_at,
            br.status
        FROM borrow_records br
        JOIN books b
            ON br.book_id = b.id
        WHERE br.user_id = $1
        ORDER BY br.borrowed_at DESC`,
        [userId]
    );

    return result.rows;
};

module.exports = {
    borrowBook,
    returnBook,
    borrowHistory
};