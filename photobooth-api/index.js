import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const app = express();
const PORT = process.env.PORT || 3000;

// strip endpoints
app.post("/", (req, res) => {
    //recieve 3 photo urls
    const photos = req.body;
    const newPhotos = photos.map(photo => ({
        url: photo.url,
        id: uuidv4(),
    }));
    //store object as a new photo in ./data/photos
    const existingPhotos = JSON.parse(fs.readFileSync("./data/photos.json"));
    existingPhotos.push(...newPhotos);
    fs.writeFileSync(("./data/photos.json"), JSON.stringify(existingPhotos))
    //respond with 201 and the new photo object
    res.status(201).json(newPhotos);
});

app.get("/", (_req, res) => {
    //get the photos from ./data/photos
    const photos = JSON.parse(fs.readFileSync("./data/photos.json"));
    // return the photo objects
    res.status(200).json(photos);
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});