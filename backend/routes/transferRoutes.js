const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all transfers
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM transfers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching transfers' });
  }
});

// POST a new transfer
router.post('/', async (req, res) => {
  const { asset_id, from_base_id, to_base_id, quantity } = req.body;
  try {
    await db.query(
      `INSERT INTO transfers (asset_id, from_base_id, to_base_id, quantity)
       VALUES ($1, $2, $3, $4)`,
      [asset_id, from_base_id, to_base_id, quantity]
    );
    res.status(201).json({ message: 'Transfer recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding transfer' });
  }
});

module.exports = router;
