import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { createCanvas, loadImage } from "canvas";

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  console.log("Received request with body:", req.body);
  const photos = req.body; // Array of base64 photo strings
  const images = [];

  const loadAndCreate = (index = 0) => {
    if (index >= photos.length) {
      createPhotoStrip(images, res);
      return;
    }
    const photo = photos[index];
    loadImage(photo)
      .then((image) => {
        images.push(image);
        loadAndCreate(index + 1);
      })
      .catch((error) => {
        console.error("Error loading image", error);
        res
          .status(400)
          .send("An error occurred while loading one of the images.");
      });
  };

  loadAndCreate();

  const createPhotoStrip = (images, res) => {
    const margin = 40;
    const padding = 20;
    const totalW = images[0].width * 3 + padding * 2 + margin * 2;
    const totalH = images[0].height + margin * 2;
    const canvas = createCanvas(totalW, totalH);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#f1f1f1";
    ctx.fillRect(0, 0, totalW, totalH);

    images.forEach((image, index) => {
      const x = margin + index * image.width + padding * index;
      const y = margin;
      ctx.drawImage(image, x, y);
    });

    const convertedStrip = canvas.toDataURL("image/png");

    res.status(201).json({
      id: uuidv4(),
      image: convertedStrip,
    });
  };
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5173`);
});
