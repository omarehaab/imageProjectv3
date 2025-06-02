"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const server_1 = require("../src/server");
describe('POST /upload', () => {
    it('should upload an image file successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/upload')
            .attach('image', path_1.default.join(__dirname, 'test.jpg'));
        expect(response.status).toBe(200);
        expect(response.text).toBe('File uploaded successfully!');
    }));
    it('should return 400 if no file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/upload');
        expect(response.status).toBe(400);
        expect(response.text).toBe('No files were uploaded.');
    }));
    it('should return 400 for invalid file type', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/upload')
            .attach('image', path_1.default.join(__dirname, 'test.txt'));
        expect(response.status).toBe(400);
    }));
    it('should handle large file upload gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Assuming test-large.jpg is a large file placed in the test directory
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/upload')
            .attach('image', path_1.default.join(__dirname, 'test-large.jpg'));
        expect([200, 413]).toContain(response.status); // 413 Payload Too Large is possible
    }));
});
