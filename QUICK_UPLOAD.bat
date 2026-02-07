@echo off
chcp 65001 >nul
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║         Qudrat App - GitHub Upload                    ║
echo ║         Account: info-afk4                            ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo.

echo [1/3] Checking branch...
git branch -M main
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to set branch!
    pause
    exit /b 1
)
echo ✓ Branch set to 'main'
echo.

echo [2/3] Ready to upload files...
echo.
echo ⚠️  IMPORTANT:
echo    When asked for password, use your Personal Access Token
echo    NOT your GitHub password!
echo.
echo    Get token from: https://github.com/settings/tokens
echo.
pause

echo.
echo [3/3] Uploading to GitHub...
echo.
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ╔════════════════════════════════════════════════════════╗
    echo ║              ✓ SUCCESS!                               ║
    echo ╚════════════════════════════════════════════════════════╝
    echo.
    echo Files uploaded to:
    echo → https://github.com/info-afk4/qudrat-app
    echo.
    echo ═══════════════════════════════════════════════════════
    echo Next Steps:
    echo ═══════════════════════════════════════════════════════
    echo.
    echo 1. Enable GitHub Pages:
    echo    → https://github.com/info-afk4/qudrat-app/settings/pages
    echo.
    echo 2. Select 'main' branch
    echo.
    echo 3. Your live app will be at:
    echo    → https://info-afk4.github.io/qudrat-app
    echo.
    echo ═══════════════════════════════════════════════════════
) else (
    echo ╔════════════════════════════════════════════════════════╗
    echo ║              ✗ FAILED!                                ║
    echo ╚════════════════════════════════════════════════════════╝
    echo.
    echo Common issues:
    echo.
    echo 1. Repository doesn't exist yet
    echo    → Create it at: https://github.com/new
    echo    → Name: qudrat-app
    echo.
    echo 2. Used password instead of token
    echo    → Get token: https://github.com/settings/tokens
    echo    → Select 'repo' scope
    echo.
    echo 3. Token doesn't have permission
    echo    → Make sure 'repo' is checked
    echo.
)

echo.
pause
