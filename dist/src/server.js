"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const port = 3000;
const publicDir = path_1.default.join(__dirname, "..");
app.use(express_1.default.static(publicDir));
const storage = multer_1.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        path_1.default.extname(file.originalname),
    );
  },
});
const upload = (0, multer_1.default)({ storage: storage });
const uploadHandler = (req, res) => {
  if (!req.file) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  console.log("Uploaded file:", req.file);
  res.send("File uploaded successfully!");
};
app.post("/upload", upload.single("image"), uploadHandler);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
