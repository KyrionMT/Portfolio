@echo off
title Kyrion MT - Portfolio
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao foi encontrado.
  echo Instale Node.js LTS em https://nodejs.org/ e execute este arquivo novamente.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Instalando dependencias. Isso acontece apenas na primeira vez...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
start "" http://localhost:5173
call npm run dev -- --host 127.0.0.1 --port 5173
pause
