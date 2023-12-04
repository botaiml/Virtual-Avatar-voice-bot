@echo off
setlocal enabledelayedexpansion

REM Define your Docker container name
set container_name=my-postgres-db

REM Check if the Docker container is running
docker ps -q --filter "name=%container_name%" > nul
if %errorlevel% equ 0 (
  REM Container is running, now check if PostgreSQL is running inside it
  docker exec %container_name% pg_isready -U postgres -h localhost -q
  if %errorlevel% equ 0 (
    echo PostgreSQL is running inside %container_name%
    exit /b 0  REM Exit with success code
  ) else (
    echo PostgreSQL is not running inside %container_name%
    exit /b 1  REM Exit with error code
  )
) else (
  echo Container %container_name% is not running
  exit /b 1  REM Exit with error code
)
