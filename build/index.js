"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articles_1 = require("./controllers/articles");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/post", articles_1.createArticle);
app.get("/", articles_1.getArticles);
app.listen(3000, () => console.log("Server is running on port 3000 🚀"));
