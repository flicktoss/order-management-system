---
description: How to reset PostgreSQL password and fix database connection
---

# Reset PostgreSQL Password and Fix Database Connection

## Step 1: Locate PostgreSQL Installation

PostgreSQL is typically installed in:
- `C:\Program Files\PostgreSQL\<version>\`
- Check your installed programs to find the version number

## Step 2: Reset the Password

### Method A: Using pgAdmin (Easiest)
1. Open **pgAdmin 4** (search for it in Windows Start menu)
2. Connect to your PostgreSQL server (it might ask for your current password)
3. Right-click on "Login/Group Roles" → "postgres"
4. Go to "Definition" tab
5. Enter a new password (e.g., `postgresql` to match your `.env` file)
6. Click "Save"

### Method B: Using Command Line
1. Find `psql.exe` in your PostgreSQL installation folder (usually `C:\Program Files\PostgreSQL\<version>\bin\`)
2. Open PowerShell as Administrator
3. Navigate to the bin folder:
   ```powershell
   cd "C:\Program Files\PostgreSQL\<version>\bin\"
   ```
4. Connect as postgres user:
   ```powershell
   .\psql.exe -U postgres
   ```
5. If it prompts for password and you don't know it, you'll need to edit `pg_hba.conf` (see Method C)
6. Once connected, run:
   ```sql
   ALTER USER postgres WITH PASSWORD 'postgresql';
   \q
   ```

### Method C: Edit pg_hba.conf (If you forgot password)
1. Locate `pg_hba.conf` file (usually in `C:\Program Files\PostgreSQL\<version>\data\`)
2. Open it with a text editor (as Administrator)
3. Find lines like:
   ```
   host    all             all             127.0.0.1/32            md5
   ```
4. Temporarily change `md5` to `trust`:
   ```
   host    all             all             127.0.0.1/32            trust
   ```
5. Save the file
6. Restart PostgreSQL service:
   - Open Services (Win + R, type `services.msc`)
   - Find "postgresql-x64-<version>"
   - Right-click → Restart
7. Now connect without password and reset it (Method B steps 4-6)
8. Change `pg_hba.conf` back to `md5`
9. Restart PostgreSQL service again

## Step 3: Create the Database

Once you can connect to PostgreSQL:

1. Open pgAdmin or use psql command line
2. Run this SQL command:
   ```sql
   CREATE DATABASE order_db;
   ```

## Step 4: Verify Your .env File

Make sure your `.env` file has the correct credentials:
```
DB_URL=jdbc:postgresql://localhost:5432/order_db
DB_USERNAME=postgres
DB_PASSWORD=postgresql
```

## Step 5: Start the Backend

Run:
```powershell
./mvnw spring-boot:run
```

## Troubleshooting

### If PostgreSQL service is not running:
1. Open Services (`services.msc`)
2. Find "postgresql-x64-<version>"
3. Right-click → Start

### If port 5432 is already in use:
1. Check what's using it:
   ```powershell
   netstat -ano | findstr :5432
   ```
2. Either stop that process or change the port in your `.env` file

### If database doesn't exist:
The error will say "database 'order_db' does not exist". Create it using Step 3 above.
