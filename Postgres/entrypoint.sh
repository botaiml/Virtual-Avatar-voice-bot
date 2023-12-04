#!/bin/bash
set -e

# Print the value of DATABASE_NAME for debugging
echo "DATABASE_NAME is set to: ${DATABASE_NAME}"

# where as Database in this container is docker exec based on container name

# Set permissions on the PostgreSQL data directory
# chmod -R 700 /var/lib/postgresql/data

# Call the original entry point script to start PostgreSQL
# exec /usr/local/bin/entrypoint.sh "$@"