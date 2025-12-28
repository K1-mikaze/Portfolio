"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getURLS = void 0;
const getURLS = async (request, response) => {
    try {
        response.json({ message: "hello" });
    }
    catch (error) {
        console.error("!!! Error getURLS :\n", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getURLS = getURLS;
//# sourceMappingURL=urls_controller.js.map