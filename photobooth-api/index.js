import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { createCanvas, loadImage } from "canvas";

// const express = require("express");
// const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// stripRoutes
app.post("/", (req, res) => {
  const photos = req.body;
  const images = [];
  
  const loadAndCreate = (index = 0) => {
    if (index >= photos.length) {
      //load from url then createw
      createPhotoStrip(images, res);
      return;
    }
    const photo = photos[index];
    load(photo.url)
      .then((image) => {
        images.push(image); // push to array
        loadAndCreate(index + 1); // Load next
      })
      .catch((error) => {
        console.error(`Error loading image`, error);
        res
          .status(400)
          .send("An error occurred while loading one of the images.");
      });
  };
  // Start load
  loadAndCreate();
  // create strip
  const createPhotoStrip = (images, res) => {
    // Create a canvas
    const margin = 40;
    const padding = 20;
    const totalW = images[0].width * 3 + padding * 2 + margin * 2;
    const totalH = images[0].height + margin * 2;
    const canvas = createCanvas(totalW, totalH);
    const ctx = canvas.getContext("2d");

    // Draw images on canvas
    ctx.fillStyle = "#f1f1f1"; //this is what we change if bg color edits
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    images.forEach((image, index) => {
      const x = margin + index * image.width + padding * index;
      const y = margin;
      ctx.drawImage(image, x, y);
    });
  };
  //convert to base 64 string for server to client
  const convertedStrip = canvas.toDataURL("image/png");
  //respond with the data (can be used as <img>)
  res.status(201).json({
    id: uuidv4(),
    image: convertedStrip,
  });
});

app.get("/:id", (_req, res) => {
  const img = fs.readFileSync("./data/photos.json");
  //read the stickers file
  //return list of stickers in button array
  res.send("pls");
});
app.post("/:id", (req, res) => {
  //read sticker file
  ///find the sticker based on id of user selection
  //find user strip obj
  //apply sticker to obj
  //return modified objsct
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});

app.use(cors());
// app.use(express.static('public'));
app.use(express.json());
app.use("/strips", express.static("public/strips"));
