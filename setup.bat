@echo off
echo ================================================
echo Pune Book Fest 2025 - Chatbot Setup Checker
echo ================================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js is NOT installed
    echo     Please install from: https://nodejs.org/
    goto :end
) else (
    node --version
    echo [OK] Node.js is installed
)
echo.

echo [2/5] Checking backend dependencies...
cd backend
if exist "node_modules\" (
    echo [OK] Backend dependencies installed
) else (
    echo [!] Installing backend dependencies...
    call npm install
)
cd ..
echo.

echo [3/5] Checking frontend dependencies...
cd frontend
if exist "node_modules\" (
    echo [OK] Frontend dependencies installed
) else (
    echo [!] Installing frontend dependencies...
    call npm install
)
cd ..
echo.

echo [4/5] Checking MongoDB connection...
echo     Please make sure MongoDB is running
echo     - Local: Start MongoDB service
echo     - Atlas: Configure .env with connection string
echo.

echo [5/5] Setup Summary
echo ================================================
echo Backend folder:  %cd%\backend
echo Frontend folder: %cd%\frontend
echo.
echo Next steps:
echo 1. Configure backend\.env with MongoDB connection
echo 2. Run: cd backend ^&^& npm run seed
echo 3. Run: cd backend ^&^& npm run dev
echo 4. In new terminal: cd frontend ^&^& npm run dev
echo 5. Open: http://localhost:5173
echo ================================================
echo.

:end
echo.
echo For detailed instructions, see SETUP_GUIDE.md
pause
