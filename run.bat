@echo off
echo Building latest website changes...
call npm run build
echo Starting Inodayam Tech Web Application...
start http://localhost:5174/
npm run preview -- --port 5174 --host
pause
