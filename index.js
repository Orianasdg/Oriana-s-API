import express from 'express';
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Bruno-26334248',
    database: 'library',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const app = express();
app.use(express.json());
const PORT = 5000;



app.post('/add-book', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }

    const sql = 'INSERT INTO books (title, author) VALUES (?, ?)';
    pool.query(sql, [title, author], (err, result) => {
        if (err) {
            console.error('Error inserting book details:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ id: result.insertId, message: `Book ${title} created successfully` });
    });
});



app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching books:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json(results);
    });
});



app.put('/update-book/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const sql = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
    pool.query(sql, [title, author, id], (err, result) => {
        if (err) {
            console.error('Error updating book details:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Book with ID ${id} not found` });
        }

        res.status(200).json({ message: `Book ${id} updated successfully` });
    });
});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
