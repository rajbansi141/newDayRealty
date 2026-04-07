@echo off
echo ========================================
echo   Starting ML API Server
echo ========================================
echo.

cd /d "%~dp0hpp"

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Checking dependencies...
python -c "import flask, pandas, sklearn, joblib" 2>nul
if errorlevel 1 (
    echo Installing required packages...
    pip install flask flask-cors pandas numpy scikit-learn joblib
)

echo.
echo Starting Flask ML API on port 5001...
echo.
python api.py

pause
