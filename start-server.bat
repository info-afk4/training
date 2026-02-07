@echo off
echo ========================================
echo      Qudrat App - Local Server
echo ========================================
echo.
echo Starting server on http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python -m http.server 8000

pause
