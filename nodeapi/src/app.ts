import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { TestConnection } from "./data-access/test.connection";
import routerProfile from "./routers/profile.router";
import routerUser from "./routers/user.router";
import routerAuth from "./routers/auth.router";
import routerDiploma from "./routers/diploma.router";
import routerNews from "./routers/news.router";
import routerImage from "./routers/image.router";
import { authMiddleware } from "./middlewares/auth.middleware";

dotenv.config();
const app = express();
const publicDir = path.resolve(__dirname, "..", "public");

const runApp = async () => {
  try {
    await TestConnection.initialize();
    // SQLite foreign key enabling removed; now using PostgreSQL

    process.on("uncaughtException", async (err) => {
      await TestConnection.destroy();
      process.exit(1);
    });

    app.use(cors());
    app.use(express.json());

    // 🟩 Статические файлы и изображения — подключаем до всего остального
    app.use(express.static(publicDir));
    app.use("/Images", express.static(publicDir));

    // Healthcheck endpoint
    app.get("/health", (_req, res) => {
      res.status(200).json({ status: "ok" });
    });

    // Mount all business routers under /api for consistent proxying
    app.use("/api", routerImage);
    app.use("/api", routerAuth);
    app.use("/api", routerProfile);
    app.use("/api", routerDiploma);
    app.use("/api", routerNews);

    // Protected routes (after auth middleware)
    app.use(authMiddleware);
    app.use("/api", routerUser);

    app.listen(3001, () => console.log("Server is running on port 3001"));
  } catch (err: any) {
    console.error(`${err.name}: ${err.message}`);
  }
};

runApp();
