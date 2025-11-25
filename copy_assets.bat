@echo off
set "SRC_DIR=C:\Users\jt741\.gemini\antigravity\brain\c969b509-735a-436d-a5cb-e405bc380e07"
set "DEST_DIR=d:\the-drafting-company---future-of-aec\public\images"

echo Source: %SRC_DIR%
echo Destination: %DEST_DIR%

if not exist "%DEST_DIR%" (
    echo Creating destination directory...
    mkdir "%DEST_DIR%"
)

echo.
echo Copying images...

copy "%SRC_DIR%\lidar_scanner_dark_1764057349101.png" "%DEST_DIR%\lidar_scanner_dark.png"
if errorlevel 1 echo FAILED to copy lidar_scanner_dark.png

copy "%SRC_DIR%\digital_twin_hologram_1764057366156.png" "%DEST_DIR%\digital_twin_hologram.png"
if errorlevel 1 echo FAILED to copy digital_twin_hologram.png

copy "%SRC_DIR%\industry_residential_1764058185777.png" "%DEST_DIR%\industry_residential.png"
if errorlevel 1 echo FAILED to copy industry_residential.png

copy "%SRC_DIR%\industry_travel_1764058200843.png" "%DEST_DIR%\industry_travel.png"
if errorlevel 1 echo FAILED to copy industry_travel.png

copy "%SRC_DIR%\industry_retail_1764058216195.png" "%DEST_DIR%\industry_retail.png"
if errorlevel 1 echo FAILED to copy industry_retail.png

copy "%SRC_DIR%\industry_commercial_1764058232064.png" "%DEST_DIR%\industry_commercial.png"
if errorlevel 1 echo FAILED to copy industry_commercial.png

copy "%SRC_DIR%\industry_manufacturing_1764058248031.png" "%DEST_DIR%\industry_manufacturing.png"
if errorlevel 1 echo FAILED to copy industry_manufacturing.png

echo.
echo Operation complete. Check for any error messages above.
pause
