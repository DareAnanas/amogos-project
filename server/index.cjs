const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // To enable CORS for Vue.js frontend
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api/assets', express.static(path.join(__dirname, '../src/assets/')));

// Create connection to MariaDB
const db = mysql.createConnection({
    host: 'junction.proxy.rlwy.net', // Replace with your MariaDB host
    port: 32806,
    user: 'root', // Replace with your MariaDB user
    password: process.env.MARIADB_ROOT_PASSWORD, // Replace with your MariaDB password
    database: 'railway', // Replace with your MariaDB database
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
    const sql = 'SELECT id, name, price FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.json(results);
        }
    });
});



// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});