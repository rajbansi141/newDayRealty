@echo off
echo ========================================
echo   Service Status Checker
echo ========================================
echo.

echo [1/3] Checking ML API (Port 5001)...
curl -s http://localhost:5001/ >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ ML API is RUNNING
) else (
    echo ✗ ML API is NOT RUNNING
    echo   Start it with: start-ml-api.bat
)

echo.
echo [2/3] Checking Backend API (Port 5000)...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend API is RUNNING
) else (
    echo ✗ Backend API is NOT RUNNING
    echo   Start it with: cd backend ^&^& npm run dev
)

echo.
echo [3/3] Checking Frontend (Port 5173)...
curl -s http://localhost:5173/ >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend is RUNNING
) else (
    echo ✗ Frontend is NOT RUNNING
    echo   Start it with: cd frontend ^&^& npm run dev
)

echo.
echo ========================================
echo   Status Check Complete
echo ========================================
echo.
pause
