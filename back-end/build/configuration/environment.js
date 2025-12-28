"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.configDotenv();
exports.default = {
    API: process.env.API_PORT || 3000,
};
//# sourceMappingURL=environment.js.map