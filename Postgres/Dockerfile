# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set permissions on the PostgreSQL data directory (if needed)
# RUN chmod -R 700 /var/lib/postgresql/data

# Copy the custom entrypoint script into the image
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Create a volume directory (if needed)
VOLUME /var/lib/postgresql/data

# Start PostgreSQL and include your while loop in the custom entrypoint script
CMD ["entrypoint.sh"]
