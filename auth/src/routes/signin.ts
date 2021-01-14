import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validationRequest } from "../middleware/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be vaild"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    res.send("good");
  }
);

export { router as signinRouter };
