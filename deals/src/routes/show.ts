import { NotFoundError } from "@cucumber-market/common";
import express, { Request, Response } from "express";
import { Deal } from "../models/deal";

const router = express.Router();

router.get("/api/deals/:id", async (req: Request, res: Response) => {
  const deals = await Deal.findById(req.params.id);
  if (!deals) {
    throw new NotFoundError();
  }

  res.send(deals);
});

export { router as showDealRouter };
