@echo off
echo Starting Nexus Universal Bridge...
echo.
echo [1/2] Launching local server on port 8000...
start /b python -m http.server 8000
echo [2/2] Opening browser...
timeout /t 2 >nul
start http://localhost:8000
echo.
echo Nexus is now running at http://localhost:8000
echo Keep this window open while using the app.
echo.
pause
