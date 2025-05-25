const db = require('../db');

const AssetModel = {
  // Dashboard Metrics with filters (already fixed)
  async getDashboardMetrics({ startDate, endDate, baseId, equipmentType }) {
    const result = await db.query(
      `SELECT
         COALESCE(SUM(a.opening_balance), 0) AS opening_balance,
         COALESCE(SUM(a.closing_balance), 0) AS closing_balance,
         COALESCE(SUM(a.net_movement), 0) AS net_movement,
         COALESCE(SUM(ass.total_assigned), 0) AS assigned,
         COALESCE(SUM(exp.total_expended), 0) AS expended
       FROM assets a
       LEFT JOIN (
         SELECT asset_id, base_id, SUM(quantity) AS total_assigned
         FROM assignments
         WHERE ($1::date IS NULL OR assignment_date >= $1)
           AND ($2::date IS NULL OR assignment_date <= $2)
         GROUP BY asset_id, base_id
       ) ass ON ass.asset_id = a.id AND ass.base_id = a.base_id
       LEFT JOIN (
         SELECT asset_id, base_id, SUM(quantity) AS total_expended
         FROM expenditures
         WHERE ($1::date IS NULL OR expenditure_date >= $1)
           AND ($2::date IS NULL OR expenditure_date <= $2)
         GROUP BY asset_id, base_id
       ) exp ON exp.asset_id = a.id AND exp.base_id = a.base_id
       WHERE ($3::int IS NULL OR a.base_id = $3)
         AND ($4::text IS NULL OR a.type = $4)`,
      [startDate, endDate, baseId, equipmentType]
    );
    return result.rows[0];
  },

  // Net Movement Details
  async getNetMovementDetails(assetId) {
    const result = await db.query(
      `SELECT movement_type, quantity, date
       FROM asset_movements
       WHERE asset_id = $1
       ORDER BY date DESC`,
      [assetId]
    );
    return result.rows;
  },

  // Purchases - Insert a new purchase record
  async recordPurchase({ assetId, baseId, quantity, date }) {
    const result = await db.query(
      `INSERT INTO purchases (asset_id, base_id, quantity, purchase_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [assetId, baseId, quantity, date]
    );
    return result.rows[0];
  },

  // Get Purchase History with filters
  async getPurchaseHistory({ startDate, endDate, equipmentType }) {
    const result = await db.query(
      `SELECT p.*, a.type
       FROM purchases p
       JOIN assets a ON p.asset_id = a.id
       WHERE ($1::date IS NULL OR p.purchase_date >= $1)
         AND ($2::date IS NULL OR p.purchase_date <= $2)
         AND ($3::text IS NULL OR a.type = $3)
       ORDER BY p.purchase_date DESC`,
      [startDate, endDate, equipmentType]
    );
    return result.rows;
  },

  // Transfers - Insert transfer record
  async transferAsset({ assetId, fromBaseId, toBaseId, quantity, date }) {
    const result = await db.query(
      `INSERT INTO transfers (asset_id, from_base_id, to_base_id, quantity, transfer_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [assetId, fromBaseId, toBaseId, quantity, date]
    );
    return result.rows[0];
  },

  // Get Transfer History with date filters
  async getTransferHistory({ startDate, endDate }) {
    const result = await db.query(
      `SELECT * FROM transfers
       WHERE ($1::date IS NULL OR transfer_date >= $1)
         AND ($2::date IS NULL OR transfer_date <= $2)
       ORDER BY transfer_date DESC`,
      [startDate, endDate]
    );
    return result.rows;
  },

  // Assignments - Assign asset to personnel
  async assignAsset({ assetId, assignedTo, quantity, date }) {
    const result = await db.query(
      `INSERT INTO assignments (asset_id, assigned_to, quantity, assignment_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [assetId, assignedTo, quantity, date]
    );
    return result.rows[0];
  },

  // Expenditures - Record an expenditure
  async recordExpenditure({ assetId, quantity, date }) {
    const result = await db.query(
      `INSERT INTO expenditures (asset_id, quantity, expenditure_date)
       VALUES ($1, $2, $3) RETURNING *`,
      [assetId, quantity, date]
    );
    return result.rows[0];
  },

  // Optional: Get Expenditure History (if you want)
  async getExpenditureHistory({ startDate, endDate, equipmentType }) {
    const result = await db.query(
      `SELECT e.*, a.type
       FROM expenditures e
       JOIN assets a ON e.asset_id = a.id
       WHERE ($1::date IS NULL OR e.expenditure_date >= $1)
         AND ($2::date IS NULL OR e.expenditure_date <= $2)
         AND ($3::text IS NULL OR a.type = $3)
       ORDER BY e.expenditure_date DESC`,
      [startDate, endDate, equipmentType]
    );
    return result.rows;
  }
};

module.exports = AssetModel;
