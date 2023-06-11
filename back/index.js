import express from "express";
import multer from "multer"
import cors from "cors"
import {config} from "./config.js";
import mysql from "mysql2/promise";

import {
    getPostInfo, createPostInfo, updatePostInfo, getPostCategories, removePostInfo, getUserPosts, getAllPostsInfo, getPostsCategory, getUserPostsCategory, getNotUserPosts, getNotUserPostsCategory} from "./controllers/postController.js";
import {getUser, changePassword, login, deleteAccount, updateAccount, registration, getUserByParams} from "./controllers/userController.js";
import {makeResponseAccepted, getUserResponses, createResponseInfo, updateResponseInfo, removeResponseInfo, getResponseInfo, getPostResponses} from "./controllers/responseController.js";
import {responseValidator, loginValidator, passwordValidator, postValidator, registrationValidator, updateValidator} from "./middleware/validators.js";
import {checkUser} from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

await mysql.createConnection(config).then(() => {
    console.log("Connected to db!")
}).catch((err) => {
    console.log(err)
})

export async function query(sql, params) {
    const connection = await mysql.createConnection(config);
    const [results,] = await connection.execute(sql, params);
    await connection.end()
    return results;
}

const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, 'photos');
    },
    filename: (_, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({
    storage
})

app.post("/upload/user", upload.single("img"), (req, res) => {
    res.json({
        url: `/usersAv/${req.file.originalname}`,
    })
});


app.use('/usersAv', express.static('photos'));



app.post("/upload/post", upload.single("img"), (req, res) => {
    res.json({
        url: `/postsAv/${req.file.originalname}`,
    })
});

app.use('/postsAv', express.static('photos'));

//users
app.get("/user", checkUser, getUser)
app.get("/user/:id", checkUser, getUserByParams)
app.post("/user/register", registrationValidator, registration)
app.post("/user/login", loginValidator, login)
app.delete("/user", checkUser, deleteAccount)
app.put("/user", checkUser, updateValidator, updateAccount)
app.patch("/user", checkUser, passwordValidator, changePassword)

//post
app.get("/post/:id", checkUser, getPostInfo)
app.get("/post", checkUser, getUserPosts)
app.get("/posts", getAllPostsInfo)
app.get("/posts/ready", checkUser, getNotUserPosts)
app.get("/posts/:category", getPostsCategory)
app.get("/posts/ready/:category", checkUser, getNotUserPostsCategory)
app.get("/my-posts/:category", checkUser, getUserPostsCategory)
app.post("/post", checkUser, postValidator, createPostInfo)
app.delete("/post/:id", checkUser, removePostInfo)
app.put("/post/:id", checkUser, postValidator, updatePostInfo)

//responses
app.get("/response/:id", checkUser, getResponseInfo)
app.get("/responses", checkUser, getUserResponses)
app.get("/responses/:post", checkUser, getPostResponses)
app.post("/response", checkUser, responseValidator, createResponseInfo)
app.delete("/response/:id", checkUser, removeResponseInfo)
app.put("/response/:id", checkUser, responseValidator, updateResponseInfo)
app.patch("/response/:id", checkUser, makeResponseAccepted)

//categories
app.get("/categories", getPostCategories)


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));