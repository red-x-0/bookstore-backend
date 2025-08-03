import express, { json, urlencoded, } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || "localhost";

app.use(cors());
app.use(json());
app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

//Database connection
import mongodb from "./config/connectDB";

mongodb(process.env.MONGO_URI!);

// Swagger
import { setupSwagger } from "./swaggerConfig";

setupSwagger(app);

import mainRouter from './routes/main'; 
import logger from "./middleware/logger";
import { Authenticate } from "./middleware/auth";
import { checkApiKey } from "./middleware/apiKey";
import booksRouter from './routes/books'; 
import authorsRouter from './routes/authors'; 
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import { notFound, errorHandler } from "./middleware/error";

// middleware
app.use(logger);

// api key middleware
app.use(checkApiKey);

//  public routes
app.use('/auth', authRouter);
app.use('/', mainRouter);

// auth middleware
app.use(Authenticate); 

// protected routes
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/users', usersRouter);


// error handler middleware
app.use(errorHandler);

// 404 handler
app.use(notFound);

// starting servers
app.listen(port, (): void => {
  console.log(`listening at ${host} ${host? "" : ":" + port}`);
});