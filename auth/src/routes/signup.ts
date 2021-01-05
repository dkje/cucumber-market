import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();
const validations = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

router.post("/api/users/signup", validations, (req: Request, res: Response) => {
  console.log("creating a user");
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  throw new DatabaseConnectionError();
  const { email, password } = req.body;
  res.send("Hi there!");
});

export { router as signupRouter };
