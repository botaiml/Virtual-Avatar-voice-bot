// src/database/connection.ts

import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { User } from '../entities/User';

export const connectDatabase = async (): Promise<Connection> => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'VirtualBot',
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscribers',
    },
  };

  return createConnection(connectionOptions);
};