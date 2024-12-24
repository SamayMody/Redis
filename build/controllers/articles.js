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
exports.getArticles = exports.createArticle = void 0;
const client_1 = require("@prisma/client");
const redis_1 = __importDefault(require("redis"));
const prisma = new client_1.PrismaClient();
const redisClient = redis_1.default.createClient();
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const articleTitle = req.body.articleTitle;
    const articleContent = req.body.articleContent;
    yield prisma.redis_prac.create({
        data: {
            username,
            articleTitle,
            articleContent
        },
    });
    res.status(200).send('Article created successfully');
});
exports.createArticle = createArticle;
const getArticles = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = redisClient.get("articles");
    if (data) {
        console.log("Data from cache");
        res.status(200).send(data);
    }
    else {
        const articles = prisma.redis_prac.findMany();
        redisClient.set("articles", JSON.stringify(articles));
        res.status(200).send("Data from db");
    }
});
exports.getArticles = getArticles;
