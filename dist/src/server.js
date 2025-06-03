"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
exports.app = (0, express_1.default)();
const port = 3000;
const publicDir = path_1.default.join(__dirname, '..');
exports.app.use(express_1.default.static(publicDir));
// Serve static files from dist under /dist path
exports.app.use('/dist', express_1.default.static(path_1.default.join(__dirname, '..', 'dist')));
// Serve index.html on root route
exports.app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(publicDir, 'index.html'));
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg'];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only .jpg and .jpeg files are allowed'));
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
const uploadHandler = (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No files were uploaded.' });
        return;
    }
    console.log('Uploaded file:', req.file);
    res.json({ message: 'File uploaded successfully!', filename: req.file.filename });
};
exports.app.post('/upload', upload.single('image'), (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError || err) {
        res.status(400).json({ error: err.message });
    }
    else {
        next();
    }
}, uploadHandler);
if (process.env.NODE_ENV !== 'test') {
    exports.app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
