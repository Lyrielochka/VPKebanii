import fs from "fs";
import path from "path";
import express from "express";

const router = express.Router();
const publicDir = path.resolve(__dirname, "..", "..", "public");
const legacyImagesDir = path.join(publicDir, "Images");
const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

router.get("/images", async (_req, res) => {
  const collected = new Set<string>();

  const readDir = async (dirPath: string) => {
    try {
      const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile()) continue;
        const ext = path.extname(entry.name).toLowerCase();
        if (allowedExtensions.has(ext)) {
          collected.add(entry.name);
        }
      }
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        console.error(`Failed to read directory ${dirPath}:`, err);
      }
    }
  };

  try {
    await readDir(publicDir);
    if (legacyImagesDir !== publicDir) {
      await readDir(legacyImagesDir);
    }

    const imageList = [...collected].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    res.json(imageList);
  } catch (error) {
    console.error("Failed to collect image list:", error);
    res.status(500).send("Failed to collect image list");
  }
});

export default router;
