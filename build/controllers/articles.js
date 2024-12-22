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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticles = exports.createArticle = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield prisma.redis_prac.findMany();
    try {
        res.status(200).send(article);
    }
    catch (error) {
        res.status(404).send('No articles found');
    }
});
exports.getArticles = getArticles;
