import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fs from 'fs';
import crypto from 'crypto';

// Security package
import helmet from 'helmet';
import dbConnection from './dbConfig/index.js';
import errorMiddleware from './models/middleware/errorMiddleware.js';
import router from './routes/index.js'



dotenv.config();

const generateRandomSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

if (!process.env.JWT_SECRET_KEY) {
  const newSecretKey = generateRandomSecretKey();
  console.log('Generated JWT Secret Key:', newSecretKey);
  fs.writeFileSync('.env', `JWT_SECRET_KEY = "${newSecretKey}"\n`, { flag: 'a' });
  console.log('Generated and updated JWT_SECRET_KEY in .env file.');
}

const app = express();
const PORT = process.env.PORT || 9000;

dbConnection();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);





// Define a simple route to return a message
app.get('/test', (req, res) => {
  res.send('This is a test message from your server.');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
