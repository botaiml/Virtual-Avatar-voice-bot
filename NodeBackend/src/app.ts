import express from 'express';
import { json } from 'body-parser';
import { userRouter } from './routes/user';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './database/postgres-connection';
import swaggerJsdoc from 'swagger-jsdoc';
export const app = express();
import { faceRouter } from './routes/face-detect';
import { connectDB as connectMongoDb } from './database/mongo-connection';
//middlewares
app.use(json({ limit: '50mb' }));

// porstgres
connectDatabase()
  .then(async (connection) => {
    console.log('Connected to the database');
    await connection.runMigrations();
  })
  .catch((error) => console.log(error));

// mongodb
connectMongoDb();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Swagger setup
const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Virtual BOT API doc',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  apis: [`./src/controllers/*.ts`, './src/dto/*.ts'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Routes
app.use('/user', userRouter);
app.use('/face', faceRouter);
