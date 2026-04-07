@echo off
echo ========================================
echo   Environment Configuration Helper
echo ========================================
echo.
echo Select environment:
echo   1. Localhost (Development)
echo   2. Production
echo   3. Show current configuration
echo   4. Exit
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" goto localhost
if "%choice%"=="2" goto production
if "%choice%"=="3" goto show
if "%choice%"=="4" goto end

:localhost
echo.
echo Configuring for LOCALHOST...
echo.
echo Backend will use:
echo   ML_API_URL=http://localhost:5001
echo   FRONTEND_URL=http://localhost:5173
echo.
echo Frontend will use:
echo   VITE_API_URL=http://localhost:5000/api
echo.
echo ✓ Configuration set for LOCALHOST
echo.
echo To start services:
echo   1. cd hpp ^&^& python api.py
echo   2. cd backend ^&^& npm run dev
echo   3. cd frontend ^&^& npm run dev
echo.
goto end

:production
echo.
echo Configuring for PRODUCTION...
echo.
set /p ml_url="Enter your ML API URL (e.g., https://your-app.onrender.com): "
set /p backend_url="Enter your Backend API URL (e.g., https://your-backend.onrender.com): "
set /p frontend_url="Enter your Frontend URL (e.g., https://your-app.vercel.app): "
echo.
echo Backend will use:
echo   ML_API_URL=%ml_url%
echo   FRONTEND_URL=%frontend_url%
echo.
echo Frontend will use:
echo   VITE_API_URL=%backend_url%/api
echo.
echo ✓ Configuration set for PRODUCTION
echo.
echo Remember to:
echo   1. Update backend/.env.production
echo   2. Update frontend/.env.production
echo   3. Redeploy services
echo.
goto end

:show
echo.
echo Current Configuration:
echo.
echo LOCALHOST (Development):
echo   Backend .env:
type backend\.env | findstr "ML_API_URL FRONTEND_URL"
echo.
echo   Frontend .env:
type frontend\.env | findstr "VITE_API_URL"
echo.
echo PRODUCTION:
echo   Backend .env.production:
type backend\.env.production | findstr "ML_API_URL FRONTEND_URL"
echo.
echo   Frontend .env.production:
type frontend\.env.production | findstr "VITE_API_URL"
echo.
goto end

:end
echo.
pause
