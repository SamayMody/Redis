import { PrismaClient } from '@prisma/client';
import * as redis from 'redis';
const prisma = new PrismaClient();
const redisClient = redis.createClient();
redisClient.on('error', (error) => {
    console.error('Redis error:', error);
});

redisClient.connect();





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

export const getArticles = async (req, res): Promise<void> => {
    const data = await redisClient.get("articles");
    const finaldata = JSON.parse(data);

    if (data) {
        console.log("Data from cache");
        res.status(200).send(finaldata);
    }
    else {
        const articles = await prisma.redis_prac.findMany();
        redisClient.set("articles", JSON.stringify(articles));
        res.status(200).send("Data from db");
    }
}
