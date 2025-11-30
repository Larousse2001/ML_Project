@echo off
cd /d "%~dp0"
echo.
echo ================================================
echo   ML Dashboard - Heart Disease Prediction
echo ================================================
echo.
echo Starting dashboard server...
echo.
python app.py
echo.
echo If you see an error about Flask not found:
echo Run: pip install flask
echo.
pause
