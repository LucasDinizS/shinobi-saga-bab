import {Application} from "express";
import {authRouter} from "./auth/index.js";
import {playersRouter} from "./players.js";
import {testRouter} from "./test.js";
import {wellKnownRouter} from "./well-known/index.js";

export default function registerRouters(app: Application) {
  app.use("/auth", authRouter);
  app.use("/players", playersRouter);
  app.use("/test", testRouter);
  app.use("/.well-known", wellKnownRouter);
}
