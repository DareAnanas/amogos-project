const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // To enable CORS for Vue.js frontend
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api/assets', express.static(path.join(__dirname, '../src/assets/')));

const PORT = process.env.PORT || 3000;

// Create connection to MariaDB
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MariaDB:', err);
        return;
    }
    console.log('Connected to MariaDB');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('/api/data/products', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.json(results);
        }
    });
});



// Start the Express server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});