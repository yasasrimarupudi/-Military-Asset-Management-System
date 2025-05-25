const express = require('express');
const router = express.Router();
const pool = require('../db'); // your PostgreSQL pool connection

// GET all purchases (already exists)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM purchases');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching purchases' });
  }
});

// ADD this POST route
router.post('/', async (req, res) => {
  const { base_id, asset_id, quantity, purchase_date } = req.body;
  if (!base_id || !asset_id || !quantity || !purchase_date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const insertQuery = `
      INSERT INTO purchases (base_id, asset_id, quantity, purchase_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [base_id, asset_id, quantity, purchase_date];
    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error adding purchase' });
  }
});

module.exports = router;
