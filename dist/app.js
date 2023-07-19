"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const toDoController_1 = __importDefault(require("./src/application/controllers/toDoController"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const rootDir = path_1.default.join(__dirname, "..");
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(rootDir, "public")));
(0, toDoController_1.default)(app);
app.get("/index.html", (req, res) => {
    res.sendFile(path_1.default.join(rootDir, "index.html"));
});
app.listen(3000, () => {
    console.log("Gurrus says hello from port 3000");
});
