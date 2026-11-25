@echo off
echo ============================================================
echo   Starting KRISHI Sahyog Platform Local Server
echo ============================================================
echo.
echo Opening website at http://localhost:8000 in your browser...
echo Press Ctrl+C in this terminal window to stop the server.
echo.
timeout /t 1 >nul
start http://localhost:8000
cd frontend
python -m http.server 8000
