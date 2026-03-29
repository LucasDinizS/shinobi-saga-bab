import express, {Request, Response} from "express";
import expressAsyncHandler from "express-async-handler";
import {moduleLogger} from "../logger.js";

const playersRouter = express.Router();
const log = moduleLogger("players");

playersRouter.get(
  "/",
  expressAsyncHandler(async (_req: Request, res: Response) => {
    try {
      const response = await fetch("https://www.byond.com/games/NSBR/NarutoSagaBrasil", {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; NarutoSagaBAB/1.0)",
        },
      });

      if (!response.ok) {
        log.warning("BYOND page returned non-OK status", {status: response.status});
        res.status(200).json({count: 0});
        return;
      }

      const html = await response.text();
      const match = html.match(/(\d+)\s+player/i);
      const count = match ? parseInt(match[1], 10) : 0;

      res.status(200).json({count});
    } catch (error) {
      log.error("Failed to fetch BYOND player count", {error});
      res.status(200).json({count: 0});
    }
  }),
);

export {playersRouter};
