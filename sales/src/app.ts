import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@cucumber-market/common";
import { createDealsRouter } from "./routes/new";
import { showDealRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false, //비암호화
    secure: process.env.NODE_ENV !== "test",
  })
);

//front middleware
app.use(currentUser);

//routers
app.use(createDealsRouter);
app.use(showDealRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

//end middleware
app.use(errorHandler);

export { app };
