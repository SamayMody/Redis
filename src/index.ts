import express from 'express';
import { createArticle, getArticles } from './controllers/articles';
const app = express();

app.use(express.json());

app.post("/post", createArticle);
app.get("/", getArticles);


app.listen(3000, () => console.log("Server is running on port 3000 🚀"));

