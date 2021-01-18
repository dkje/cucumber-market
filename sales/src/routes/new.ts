import express, { Request, Response } from "express";
import { requireAuth, validationRequest } from "@cucumber-market/common";
import { body } from "express-validator";
import { Deal } from "../models/deal";

const router = express.Router();

const validationCheckList = [
  body("title").not().isEmpty().withMessage("제목을 작성해주세요"),
  body("price").isFloat({ gt: 0 }).withMessage("가격은 0원 이상이어야 합니다"),
];

router.post(
  "/api/deals",
  requireAuth,
  validationCheckList,
  validationRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const deal = Deal.build({ title, price, userId: req.currentUser!.id });
    await deal.save();
    res.status(201).send(deal);
  }
);

export { router as createDealsRouter };
