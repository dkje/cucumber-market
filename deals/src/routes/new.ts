import express, { Request, Response } from "express";
import { requireAuth, validationRequest } from "@cucumber-market/common";
import { body } from "express-validator";
import { Deal } from "../models/deal";
import { dealValidation } from "./validations";

const router = express.Router();

router.post(
  "/api/deals",
  requireAuth,
  dealValidation,
  validationRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const deal = Deal.build({ title, price, userId: req.currentUser!.id });
    await deal.save();
    res.status(201).send(deal);
  }
);

export { router as createDealsRouter };
