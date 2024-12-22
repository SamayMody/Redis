import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createArticle = async (req, res) => {
    const username = req.body.username;
    const articleTitle = req.body.articleTitle;
    const articleContent = req.body.articleContent;
    await prisma.redis_prac.create({
        data: {
            username,
            articleTitle,
            articleContent
        },
    })
    res.status(200).send('Article created successfully');

}

export const getArticles = async (req, res) => {
    const article = await prisma.redis_prac.findMany();
    try {
        res.status(200).send(article);
    } catch (error) {
        res.status(404).send('No articles found');

    }
}