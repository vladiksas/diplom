import {validationResult} from "express-validator";
import {
    createPost,
    getPost,
    updatePost,
    getPostsByAuthor,
    deletePost,
    getPosts,
    getCategories,
    getCategoryById,
    getPostsByCategory,
    getPostsByAuthorByCategory,
    getPostsNotAuthor,
    getPostsByCategoryNoAuthor
} from "../services/postService.js";

export const createPostInfo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        let now = new Date()
        now = now.toISOString().split('T')[0]

        await createPost(req.body.title, req.body.text, req.User, parseInt(req.body.category), now, req.body.avatar)

        res.status(201).json();

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Створення поста не здійснено"
            }
        )
    }
}

export const updatePostInfo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        await updatePost(req.params.id, req.body.title, req.body.text, parseInt(req.body.category), req.body.avatar)
        let post = await getPost(req.params.id)
        post = post[0]
        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Редагування поста не здійснено"
            }
        )
    }
}

export const removePostInfo = async (req, res) => {
    try {

        await deletePost(req.params.id)

        res.status(204).json();

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Видалення пост не здійснено"
            }
        )
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const posts = await getPostsByAuthor(req.User)
        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Пости користувача не знайдено"
            }
        )
    }
}

export const getNotUserPosts = async (req, res) => {
    try {
        const posts = await getPostsNotAuthor(req.User)
        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Пости користувача не знайдено"
            }
        )
    }
}

export const getPostInfo = async (req, res) => {
    try {


        let post = await getPost(req.params.id)
        post = post[0]
        res.json(post);


    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Пост не знайдено"
            }
        )
    }
}

export const getPostCategories = async (req, res) => {
    try {
        const categories = await getCategories()
        res.json(categories);


    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Категорії не знайдені"
            }
        )
    }
}

export const getAllPostsInfo = async (req, res) => {
    try {


        const posts = await getPosts()

        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Пости не знайдено"
            }
        )
    }
}

export const getPostsCategory = async (req, res) => {
    try {

        const posts = await getPostsByCategory(parseInt(req.params.category))
        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Пости не знайдено"
            }
        )
    }
}

export const getUserPostsCategory = async (req, res) => {
    try {
        const posts = await getPostsByAuthorByCategory(req.User, parseInt(req.params.category))
        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Пости не знайдено"
            }
        )
    }
}

export const getNotUserPostsCategory = async (req, res) => {
    try {
        const posts = await getPostsByCategoryNoAuthor(req.User, parseInt(req.params.category))
        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Пости не знайдено"
            }
        )
    }
}


