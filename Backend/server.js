const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'farminvest',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET /api/investments - use this for fetching the all the invesment details in the database
app.get('/api/investments', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, farmer_name, amount, crop, created_at FROM investments ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/investments - use for add the new investment details to the Database
app.post('/api/investments', async (req, res) => {
  const { farmer_name, amount, crop } = req.body;
  
  // Validate the user name
  if (!farmer_name || !amount || !crop) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO investments (farmer_name, amount, crop) VALUES (?, ?, ?)',
      [farmer_name, amount, crop]
    );
    
    const [rows] = await pool.query(
      'SELECT id, farmer_name, amount, crop, created_at FROM investments WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create investment' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});