@echo off
chcp 65001 >nul
echo ========================================
echo   GitHub Upload Helper
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo [ERROR] Git repository not initialized!
    echo Run: git init
    pause
    exit /b 1
)

echo Current status:
git status
echo.
echo ========================================
echo.

REM Ask for GitHub username
set /p USERNAME="Enter your GitHub username: "

echo.
echo Setting up remote...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/qudrat-app.git

echo.
echo Making sure branch is 'main'...
git branch -M main

echo.
echo ========================================
echo Ready to push!
echo ========================================
echo.
echo You will be asked for:
echo   - Username: %USERNAME%
echo   - Password: [Use Personal Access Token, NOT password]
echo.
echo If you don't have a token, get one from:
echo https://github.com/settings/tokens
echo.
pause

echo.
echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Files uploaded to GitHub!
    echo ========================================
    echo.
    echo Your repository: https://github.com/%USERNAME%/qudrat-app
    echo.
    echo Next steps:
    echo 1. Go to: https://github.com/%USERNAME%/qudrat-app/settings/pages
    echo 2. Enable GitHub Pages
    echo 3. Select 'main' branch
    echo 4. Get your live URL!
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR! Push failed.
    echo ========================================
    echo.
    echo Common issues:
    echo - Using password instead of token
    echo - Token doesn't have 'repo' permission
    echo - Repository doesn't exist on GitHub yet
    echo.
    echo Read GITHUB_UPLOAD_GUIDE.md for help!
    echo.
)

pause
