@echo off
cd /d "%~dp0"
echo Starting Node.js app...
start "" npm run dev

:: Wait a few seconds for the server to start
timeout /t 5 /nobreak >nul

:: Open the app in Google Chrome (replace the URL if different)
start chrome http://localhost:5173

pause
