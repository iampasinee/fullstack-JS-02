// SQLite3 CRUD operrations
// npm installl sqliter3
// Create a Book.sqlite file in Databasr folder
// Run this file with node CRUDBookSQLite.js
// Test with 


const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// connect to database
const db = new sqlite3.Database('./Database/Book.sqlite');

// parse incoming requests
app.use(express.json());

// create book table if it dosen't extst
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
    )
`);

// route / 
app.get("/", (req, res) => {
  res.send("Hello Book World!");
});

// route to get all books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.json(rows);
        }
    });
});

// route to get a books by id
app.get('/books/:id', (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err, row) => {
        if(err){
            res.status(500).send(err);
        }else {
            if(!row){
                res.status(404).send('Book not found');
            }else {
                res.json(row);
            }
        }
    });
});

//route to create a new book
app.post('/books', (req, res) => {
    const book = req.body;
    db.run('INSERT INTO books (title, author) VALUES (?, ?)', book.title, book.author, req.params.id, function(err){
        if(err){
            res.status(500).send(err);
        }else {
            res.send(book);
        }
    });
});

//route to update a book
app.put('/books/:id', (req, res) =>{
    const book = req.body;
    db.run('UPDATE books SET title = ?, author = ? WHERE id = ?', book.title, book.author, req.params.id, function(err){
        if(err){
            res.status(500).send(err);
        }else {
            res.send(book);
        }
    });
});

//route to delete a book
app.delete('/books/:id', (req, res) =>{
    db.run('DELETE FROM books WHERE id = ?', req.params.id, function(err){
        if(err){
            res.status(500).send(err);
        }else {
            res.send(book);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) 


