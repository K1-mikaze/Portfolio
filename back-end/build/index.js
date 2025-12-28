"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const environment_1 = __importDefault(require("./configuration/environment"));
app_1.default.listen(environment_1.default.API);
console.log("API running on Port : ", environment_1.default.API);
//# sourceMappingURL=index.js.map