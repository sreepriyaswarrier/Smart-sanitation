# SmartSanitation – Thrissur Corporation (Full-stack starter)

This is a runnable educational prototype scaffold with a React frontend, Express REST API and MongoDB/Mongoose models. It supports separate Administrator, Worker and Citizen logins. It is not a production-ready municipal system.

## Start the database
### Option A: Local MongoDB
Install MongoDB Community Server and start the MongoDB service. Default connection: `mongodb://127.0.0.1:27017/smartsanitation`.
### Option B: MongoDB Atlas
Create a database user and network access rule, copy the connection URI into `server/.env` as `MONGODB_URI`. Never commit `.env` to GitHub.

## Start the backend
Open a VS Code terminal:
```bash
cd server
npm install
```
Copy `.env.example` to `.env`, set a strong `JWT_SECRET`, then run:
```bash
npm run seed
npm run dev
```
Check `http://localhost:5000/api/health`.

## Start the frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the URL printed by Vite, usually `http://localhost:5173`.

## Development demo accounts
- Admin: `admin@smartsanitation.local` / `Admin123!`
- Worker: `worker@smartsanitation.local` / `Worker123!`
- Citizen: `citizen@smartsanitation.local` / `Citizen123!`

These accounts are for local demonstration only. Change all credentials before any deployment.

## Features in this starter
- Three role-based login modules, JWT authentication and hashed passwords
- Admin worker registration, work-site creation, QR generation, work assignment and in-app notifications
- Assignment status updates and server-side timestamped QR check-in API
- Admin manual attendance correction with a reason, and work verification decision
- Before/after evidence references and review screen
- Citizen complaint submission, unique complaint numbers, status history, apology-letter field and notifications
- Dashboard counts and assignment status totals
- Static site map links using OpenStreetMap; no live GPS tracking

## QR attendance flow
1. Admin creates a work site and prints its QR code.
2. Admin assigns a worker, task, start time and finish time to that site.
3. Worker logs in and scans the QR code physically displayed at the site (a QR scanner integration/UI is a next implementation step; check-in API is available).
4. Backend checks the site token against the worker's assignment and records server time. It does not read GPS.
5. Admin/supervisor separately verifies identity. QR alone cannot prove identity or prevent someone sharing a QR image.
6. If the phone/app/network fails, worker reports the issue; admin records a manual correction with an explanation. Manual changes should be auditable.

## Important limitations / next work
- The frontend is a functional starter but does not yet implement QR scanning from the phone camera; the API check-in route is present. A QR scanning library and camera permissions are needed to finish that screen.
- The photo form currently accepts image URLs/references, not actual image file uploads. Add Multer validation and preferably object storage (e.g. Cloudinary/S3) before real use.
- In-app notifications are saved in MongoDB; live push/SMS/email delivery is not configured.
- Citizen complaint coordinates are optional API fields, but the current form asks for text location only. Add a pin picker/map form if required.
- The API has basic role authorization, but a real deployment needs stricter input validation, rate limiting, audit logs, HTTPS, database backups, security review, and a documented photo retention policy.
- Do not automatically delete evidence immediately after approval. Keep it for an agreed retention period and preserve verification metadata/audit records; only then delete files according to an approved policy.
