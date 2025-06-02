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
const imageProcessor_1 = require("../src/utils/imageProcessor");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe('Image Resizer', () => {
    const testFilename = 'test.jpg';
    const testWidth = 100;
    const testHeight = 100;
    const outputDir = path_1.default.join(__dirname, '../images');
    const outputPath = path_1.default.join(outputDir, `${testFilename}_${testWidth}x${testHeight}.jpg`);
    afterAll(() => {
        // Clean up the resized image after tests
        if (fs_1.default.existsSync(outputPath)) {
            fs_1.default.unlinkSync(outputPath);
        }
    });
    it('should resize the image and save it to disk', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, imageProcessor_1.resizeImage)(testFilename, testWidth, testHeight);
        expect(fs_1.default.existsSync(result)).toBeTrue();
        expect(result).toBe(outputPath);
    }));
    it('should return existing image path if resized image already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a dummy file to simulate existing resized image
        fs_1.default.writeFileSync(outputPath, 'dummy content');
        const result = yield (0, imageProcessor_1.resizeImage)(testFilename, testWidth, testHeight);
        expect(result).toBe(outputPath);
        // Clean up dummy file
        fs_1.default.unlinkSync(outputPath);
    }));
});
