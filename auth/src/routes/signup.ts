import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validationRequest } from "@cucumber-market/common";
import { User } from "../models/users";

const router = express.Router();
const validations = [
  body("email").isEmail().withMessage("유효하지 않은 메일입니다"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("비밀번호는 4 ~ 20자 사이의 문자여야합니다"),
];

router.post(
  "/api/users/signup",
  validations,
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email in use");
      // return res.send({});
      throw new BadRequestError("사용 중인 이메일입니다");
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    //Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
