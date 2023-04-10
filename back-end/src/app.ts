import "reflect-metadata";
import "express-async-errors";
import { HandleError } from "./errors";
import express from "express";
import userRouter from "./routes/users.router";

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(HandleError);

export default app;
