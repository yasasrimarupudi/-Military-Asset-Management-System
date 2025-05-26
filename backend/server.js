require('dotenv').config(); // ✅ Load .env variables first

const express = require('express');
const cors = require('cors');
require('./db'); // Database connection

const authRoutes = require('./routes/authRoutes');
const assetRoutes = require('./routes/assetRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const transferRoutes = require('./routes/transferRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://military-asset-management-system-frontend-guq3.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


app.use(express.json());
app.use(loggerMiddleware);

// ❌ Remove express-session since you're using JWT
// app.use(session({ ... })); 

app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
