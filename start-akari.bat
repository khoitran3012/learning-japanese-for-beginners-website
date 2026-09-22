@echo off
setlocal EnableExtensions
cd /d "%~dp0."

echo/
echo  Akari - detecting Node.js and npm...
echo/

set "PF86=%ProgramFiles(x86)%"
if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
if defined PF86 if exist "%PF86%\nodejs\node.exe" set "PATH=%PF86%\nodejs;%PATH%"
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
if defined NVM_SYMLINK if exist "%NVM_SYMLINK%\node.exe" set "PATH=%NVM_SYMLINK%;%PATH%"
if defined NVM_HOME if exist "%NVM_HOME%\nodejs\node.exe" set "PATH=%NVM_HOME%\nodejs;%PATH%"
if exist "%USERPROFILE%\scoop\apps\nodejs\current\node.exe" set "PATH=%USERPROFILE%\scoop\apps\nodejs\current;%PATH%"
if exist "%USERPROFILE%\scoop\apps\nodejs-lts\current\node.exe" set "PATH=%USERPROFILE%\scoop\apps\nodejs-lts\current;%PATH%"
if exist "%USERPROFILE%\scoop\shims\node.exe" set "PATH=%USERPROFILE%\scoop\shims;%PATH%"
if exist "%USERPROFILE%\.volta\bin\node.exe" set "PATH=%USERPROFILE%\.volta\bin;%PATH%"
if exist "%LOCALAPPDATA%\Volta\bin\node.exe" set "PATH=%LOCALAPPDATA%\Volta\bin;%PATH%"
if exist "%ProgramData%\chocolatey\bin\node.exe" set "PATH=%ProgramData%\chocolatey\bin;%PATH%"
if exist "%USERPROFILE%\.local\share\fnm\aliases\default\node.exe" set "PATH=%USERPROFILE%\.local\share\fnm\aliases\default;%PATH%"
if exist "%LOCALAPPDATA%\fnm\aliases\default\node.exe" set "PATH=%LOCALAPPDATA%\fnm\aliases\default;%PATH%"

where node >nul 2>&1
if errorlevel 1 goto missing_node
node -v >nul 2>&1
if errorlevel 1 goto missing_node

where npm >nul 2>&1
if errorlevel 1 goto missing_npm
call npm.cmd -v >nul 2>&1
if errorlevel 1 (
  npm -v >nul 2>&1
  if errorlevel 1 goto missing_npm
)

echo  Node.js:
node -v
echo  npm:
call npm.cmd -v 2>nul
if errorlevel 1 npm -v
echo/

if not exist "package.json" goto no_pkg

if not exist "akari-host.json" (
  if exist "akari-host.example.json" copy /y "akari-host.example.json" "akari-host.json" >nul
)

if exist "node_modules\vite\bin\vite.js" goto start_app

echo  First run: installing packages. This can take a few minutes...
echo/
set "NODE_ENV=development"
call npm.cmd install --no-fund --no-audit
if errorlevel 1 (
  echo/
  echo  npm.cmd failed, retrying with npm...
  npm install --no-fund --no-audit
)
if errorlevel 1 goto npm_fail
if not exist "node_modules\vite\bin\vite.js" goto npm_fail
echo/

:start_app
echo  Starting Akari...
echo  Open http://khoitran3012.ddns.net:8080  or  http://localhost:8080
echo  Press Ctrl+C to stop.
echo  Tip: Node 22 LTS. If PGLite fails, delete the data\pglite folder and retry.
echo/
node scripts\self-host.mjs
set "ERR=%ERRORLEVEL%"
echo/
if not "%ERR%"=="0" echo  Akari stopped with error %ERR%.
pause
exit /b %ERR%

:missing_node
echo  Node.js not found.
echo  Install LTS from https://nodejs.org
echo  Use the Windows .msi installer and keep "Add to PATH" checked.
echo  Then run start-akari.bat again. No reboot needed.
echo/
pause
exit /b 1

:missing_npm
echo  Found Node.js but not npm.
echo  Reinstall Node.js LTS from https://nodejs.org ^(includes npm^).
echo/
pause
exit /b 1

:no_pkg
echo  package.json not found.
echo  Put start-akari.bat in the Akari project folder, then run it again.
echo  Current folder:
cd
echo/
pause
exit /b 1

:npm_fail
echo/
echo  npm install failed.
echo  Check internet, then run start-akari.bat again.
echo  If Windows blocked scripts, open this folder in cmd and run:
echo    npm install --no-fund --no-audit
echo/
pause
exit /b 1
