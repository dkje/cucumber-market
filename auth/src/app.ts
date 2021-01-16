import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
// proxy는 https가 아니기 때문에 신뢰받지 못함
// ngnix 프록시 트래픽을 받을 수 있도록 설정하기
app.use(json());
app.use(
  cookieSession({
    signed: false, //비암호화
    secure: process.env.NODE_ENV !== "test", // test환경일시 false
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
// 마지막에 errorHandler가 모든 error type을 처리

export { app };
