import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import api from './routes/api.js';
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '12mb' }));
app.use('/api', api);
app.use((err, _req, res, _next) => { console.error(err); if (err?.code === 11000) return res.status(409).json({ message: 'A record with this email/employee ID already exists' }); res.status(500).json({ message: 'Server error', detail: process.env.NODE_ENV === 'development' ? err.message : undefined }); });
const port = process.env.PORT || 5000;
try { await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartsanitation'); console.log('MongoDB connected'); app.listen(port, () => console.log(`SmartSanitation API running at http://localhost:${port}`)); }
catch (err) { console.error('Could not connect to MongoDB:', err.message); process.exit(1); }
