import { body } from "express-validator";

export const dealValidation = [
  body("title").not().isEmpty().withMessage("제목을 입력해주세요"),
  body("price").isFloat({ gt: 0 }).withMessage("가격은 0원 이상이어야 합니다"),
];
