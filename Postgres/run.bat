@echo off
echo Installing and running the PostgreSQL container...

:: Set folder attributes on the data directory (replace with the actual path)
powershell -Command "Set-ItemProperty -Path 'data' -Name 'Attributes' -Value 'Directory'"

:: Set folder permissions on the data directory to 0700 (replace with the actual path)
set directoryPath=data
icacls "%directoryPath%" /grant:r "NT AUTHORITY\Authenticated Users:(OI)(CI)(RX)"
icacls "%directoryPath%" /grant:r "NT AUTHORITY\SYSTEM:(OI)(CI)(F)"
icacls "%directoryPath%" /grant:r "BUILTIN\Administrators:(OI)(CI)(F)"

:: Change permissions on the data directory (optional)
docker exec my-postgres-db chmod -R 700 /var/lib/postgresql/data

:: Start the PostgreSQL container using Docker Compose
docker-compose up --build -d

echo PostgreSQL container is now running.

:: Check if PostgreSQL is running in a loop
:check_postgres
docker exec my-postgres-db pg_isready -q -h localhost -U postgres
if %errorlevel% equ 0 (
    echo PostgreSQL is running.
) else (
    echo PostgreSQL is not running. Waiting...
    timeout /t 5
    goto check_postgres
)
