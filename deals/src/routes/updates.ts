import express, { Request, Response } from "express";
import {
  validationRequest,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@cucumber-market/common";
import { Deal } from "../models/deal";
import { dealValidation } from "./validations";

const router = express.Router();

router.put(
  "/api/deals/:id",
  requireAuth,
  dealValidation,
  validationRequest,
  async (req: Request, res: Response) => {
    const deal = await Deal.findById(req.params.id);
    if (!deal) throw new NotFoundError();

    if (deal.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    await deal.set({ ...req.body }).save();

    res.send(deal);
  }
);

export { router as updateDealRouter };
