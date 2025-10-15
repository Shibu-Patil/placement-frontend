@echo off
cd /d "%~dp0"

echo ===================================================
echo Installing dependencies...
echo ===================================================
call npm install

echo ===================================================
echo Starting development server...
echo ===================================================
start "Vite Server" cmd /k "npm run dev"

:: Wait 5 seconds to let the server start
timeout /t 5 /nobreak >nul

echo Opening app in Chrome...
start "" "chrome" "http://localhost:5173"

pause
