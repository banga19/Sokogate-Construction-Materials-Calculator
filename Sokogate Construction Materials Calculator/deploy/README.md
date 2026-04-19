# Sokogate Calculator - Deployment to HostPinnacle cPanel

## Quick Deploy Steps

### Option 1: File Upload (Recommended)

1. **Login to cPanel** at https://portal.hostpinnacle.com

2. **Create Node.js Application**
   - Go to **Software** → **Setup Node.js App**
   - Click **Create Application**
   - Configure:
     - Node.js Version: `18` or `20`
     - Application Mode: `Production`
     - Application Root: `sokogate` (or your preferred folder)
     - Application URL: Your domain or subdomain
     - Application Startup File: `build/server/index.js`
   - Click **Create**

3. **Upload Files**
   - Go to **Files** → **File Manager**
   - Navigate to `/home/username/sokogate/`
   - Upload all contents from the `deploy/` folder
   - Ensure folder structure:
     ```
     sokogate/
     ├── .env
     ├── build/
     │   ├── client/
     │   ├── server/
     │   └── package.json
     ```

4. **Install Dependencies**
   - Go back to **Setup Node.js App**
   - Find your application
   - Click **Run NPM Install**

5. **Set Environment Variables**
   - Click on your app
   - Edit the `.env` file with your Neon database URL
   - Or set variables in the environment variables section

6. **Start Application**
   - Click **Start** / **Restart**
   - Visit your domain

---

### Option 2: Upload via ZIP

1. Create a ZIP file of the contents
2. Upload via File Manager → Upload
3. Extract in place
4. Follow steps 4-6 above

---

## Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | Neon PostgreSQL connection string | `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/db?sslmode=require` |
| NODE_ENV | Set to `production` | `production` |
| PORT | Usually auto-detected | `3000` |

---

## Getting Neon Database

1. Go to https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the **Connection String** (with `?sslmode=require`)
5. Paste into `.env` as `DATABASE_URL`

---

## Troubleshooting

| Error | Solution |
|-------|---------|
| 503 Service Unavailable | Run `npm install` in cPanel, then restart |
| Database connection error | Verify DATABASE_URL is correct |
| Static assets not loading | Check `build/client/` folder exists |
| Port already in use | Contact HostPinnacle support |

---

## Files Included

- `build/server/index.js` - Server entry point
- `build/client/` - Frontend static assets
- `build/server/` - Server-side code
- `.env` - Environment template