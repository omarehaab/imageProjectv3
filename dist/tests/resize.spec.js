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
describe('Image Resizer', () => {
    it('should resize the image and save it to disk', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, imageProcessor_1.resizeImage)('test.jpg', 100, 100);
        expect(fs_1.default.existsSync(result)).toBeTrue();
    }));
});
