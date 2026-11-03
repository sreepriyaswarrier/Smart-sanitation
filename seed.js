import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Site } from './models/index.js';
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartsanitation');
const demos = [
  { name: 'System Administrator', email: 'admin@smartsanitation.local', password: 'Admin123!', role: 'admin' },
  { name: 'Anu Worker', email: 'worker@smartsanitation.local', password: 'Worker123!', role: 'worker', employeeId: 'TMC-1001', age: 29 },
  { name: 'Demo Citizen', email: 'citizen@smartsanitation.local', password: 'Citizen123!', role: 'citizen' }
];
for (const d of demos) { const { password, ...data } = d; await User.findOneAndUpdate({ email: d.email }, { ...data, passwordHash: await bcrypt.hash(password, 12) }, { upsert: true, new: true, setDefaultsOnInsert: true }); }
await Site.findOneAndUpdate({ name: 'Swaraj Round (Demo Site)' }, { name: 'Swaraj Round (Demo Site)', address: 'Swaraj Round, Thrissur, Kerala', latitude: 10.5276, longitude: 76.2144, qrToken: 'DEMO-SITE-QR-CHANGE-ME' }, { upsert: true, new: true, setDefaultsOnInsert: true });
console.log('Demo users and one demo site created. Change demo passwords before deployment.'); await mongoose.disconnect();
