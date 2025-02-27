import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const app = express();
const PORT = process.env.PORT || 3000;

const upload = "./data/uploads"

// strip endpoints
app.post("/", (req, res) => {

    const busboy = new busboy ({headers: req.headers});
    const uploadedPhotos = [];
    const photos = [];
    busboy.on("file", (fieldname, file, filename) => {
        const fileId = uuidv4();
        const filePath = path.join(upload, `${fileId}-${filename}`);
        file.pipe(fs.createWriteStream(filePath));
        uploadedPhotos.push({ fieldname, file, filePath, filename });
        });
    
        busboy.on("finish", () => {
        uploadedPhotos.forEach((fileInfo) => {
          const newPhoto = {
            url: `/uploads/${path.basename(fileInfo.filePath)}`,
            id: uuidv4(),
            timestamp: Date.now(),
          };
          photos.push(newPhoto);
        });
    
        const existingPhotos = JSON.parse(fs.readFileSync(("./data/photos.json"), "utf-8"));
        existingPhotos.push(...photos);
        fs.writeFileSync(("./data/photos.json"), JSON.stringify(existingPhotos));
        
        res.status(201).json(photos);
        });

    req.pipe(busboy);
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
