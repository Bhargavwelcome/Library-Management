const pool = require("../db/pool");

// Add Book
const addBook = async (book) => {
    const {
        title,
        author,
        isbn,
        category,
        quantity,
        available_quantity
    } = book;

    const result = await pool.query(
        `INSERT INTO books
        (title, author, isbn, category, quantity, available_quantity)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [title, author, isbn, category, quantity, available_quantity]
    );

    return {
        message: "Book Added Successfully",
        book: result.rows[0]
    };
};

// Get All Books
const getAllBooks = async () => {
    const result = await pool.query(
        "SELECT * FROM books ORDER BY id"
    );

    return result.rows;
};

// Get Book By ID
const getBookById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM books WHERE id=$1",
        [id]
    );

    if (result.rows.length === 0)
        throw new Error("Book not found");

    return result.rows[0];
};

// Update Book
const updateBook = async (id, book) => {

    const {
        title,
        author,
        isbn,
        category,
        quantity,
        available_quantity
    } = book;

    const result = await pool.query(
        `UPDATE books
         SET title=$1,
             author=$2,
             isbn=$3,
             category=$4,
             quantity=$5,
             available_quantity=$6
         WHERE id=$7
         RETURNING *`,
        [title, author, isbn, category, quantity, available_quantity, id]
    );

    return {
        message: "Book Updated Successfully",
        book: result.rows[0]
    };
};

// Delete Book
const deleteBook = async (id) => {

    await pool.query(
        "DELETE FROM books WHERE id=$1",
        [id]
    );

    return {
        message: "Book Deleted Successfully"
    };
};

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};