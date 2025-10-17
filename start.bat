@echo off
title Pune Book Fest 2025 - Chatbot Application

:menu
cls
echo ================================================
echo   Pune Book Fest 2025 - Chatbot Launcher
echo ================================================
echo.
echo   1. First Time Setup (Install Dependencies)
echo   2. Seed Database with Sample Data
echo   3. Start Backend Server Only
echo   4. Start Frontend Server Only
echo   5. Start Both Servers (Full App)
echo   6. Open Application in Browser
echo   7. View Logs
echo   8. Exit
echo.
echo ================================================
set /p choice="Select an option (1-8): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto seed
if "%choice%"=="3" goto backend
if "%choice%"=="4" goto frontend
if "%choice%"=="5" goto both
if "%choice%"=="6" goto browser
if "%choice%"=="7" goto logs
if "%choice%"=="8" goto end
goto menu

:install
cls
echo Installing dependencies...
echo.
echo [1/2] Installing backend dependencies...
cd backend
call npm install
cd ..
echo.
echo [2/2] Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.
echo ================================================
echo Installation complete!
echo Next step: Configure backend\.env with MongoDB
echo Then run option 2 to seed the database
echo ================================================
pause
goto menu

:seed
cls
echo Seeding database...
cd backend
call npm run seed
cd ..
echo.
echo ================================================
echo Database seeded successfully!
echo You can now start the servers (option 5)
echo ================================================
pause
goto menu

:backend
cls
echo Starting Backend Server...
echo Backend will run on: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo ================================================
cd backend
call npm run dev
cd ..
pause
goto menu

:frontend
cls
echo Starting Frontend Server...
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo ================================================
cd frontend
call npm run dev
cd ..
pause
goto menu

:both
cls
echo ================================================
echo Starting Both Servers...
echo ================================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo IMPORTANT: Keep this window open!
echo           Open http://localhost:5173 in your browser
echo.
echo Press Ctrl+C to stop both servers
echo ================================================
echo.

start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak > nul

echo.
echo Servers are starting in separate windows...
echo Waiting 5 seconds before opening browser...
timeout /t 5 /nobreak > nul
start http://localhost:5173
echo.
echo Application should now be open in your browser!
echo.
pause
goto menu

:browser
start http://localhost:5173
echo Browser opened!
timeout /t 2 /nobreak > nul
goto menu

:logs
cls
echo ================================================
echo   Application Information
echo ================================================
echo.
echo Backend API:  http://localhost:5000
echo Frontend:     http://localhost:5173
echo.
echo API Endpoints:
echo   - POST   /api/messages
echo   - GET    /api/messages/:sessionId
echo   - GET    /api/schedule
echo   - GET    /api/schedule/days
echo   - GET    /api/schedule/:day
echo   - GET    /api/links
echo   - GET    /api/links/:name
echo.
echo Database: MongoDB (check .env for connection)
echo.
echo For detailed logs, check the server windows
echo ================================================
pause
goto menu

:end
cls
echo ================================================
echo Thank you for using Pune Book Fest 2025 Chatbot!
echo ================================================
echo.
echo Remember to:
echo - Stop all running servers (Ctrl+C)
echo - Close server terminal windows
echo.
echo For more info, see:
echo - README.md (Full documentation)
echo - SETUP_GUIDE.md (Setup instructions)
echo - DESIGN_GUIDE.md (Design reference)
echo.
pause
exit

:error
echo.
echo An error occurred. Please check:
echo 1. Node.js is installed
echo 2. Dependencies are installed (option 1)
echo 3. MongoDB is configured
echo.
pause
goto menu
