import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/users";
import { validationRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("유효하지 않은 이메일입니다"),
    body("password").trim().notEmpty().withMessage("비밀번호를 입력해주세요"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      throw new BadRequestError("인증 정보가 유효하지 않습니다");

    //compare password
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch)
      throw new BadRequestError("인증 정보가 유효하지 않습니다");

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { ...req.session, jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
