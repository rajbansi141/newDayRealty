@echo off
echo ========================================
echo   newDay Realty - ML Integration
echo ========================================
echo.

echo [1/3] Starting Flask ML API...
cd hpp
start "ML API" cmd /k "python api.py"
timeout /t 3 /nobreak >nul

echo [2/3] Installing backend dependencies...
cd ..\backend
call npm install axios
timeout /t 2 /nobreak >nul

echo [3/3] Starting Express Backend...
start "Backend API" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   All Services Started!
echo ========================================
echo.
echo   ML API:      http://localhost:5001
echo   Backend:     http://localhost:5000
echo   Frontend:    http://localhost:5173
echo.
echo Press any key to open frontend...
pause >nul

cd ..\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo All services are running!
echo Close this window to stop all services.
pause
