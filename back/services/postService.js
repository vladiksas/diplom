import {query} from "../index.js";

export const getPost = async (id) => {
    return await query("SELECT p.Id as PostId, p.Title, p.Text, p.Date, p.Author, p.Avatar, c.Name, c.Id as " +
        "CategoryId, c.Details FROM POST p LEFT JOIN POST_CATEGORY as c ON p.Category=c.Id WHERE p.Id = ? ",
        [id]) ;
}

export const createPost = async (title, text, author, category, date, avatar) => {
    return await query("INSERT INTO POST(Title, Text, Author, Category, Date, Avatar) values(?,?,?,?,?,?)",
        [title, text, author, category, date, avatar])
}

export const updatePost = async (id, title, text, category, avatar) => {
    return await query("UPDATE POST SET Title = ?, Text = ?, Category = ?, Avatar = ? WHERE Id = ?",
        [title, text, category, avatar, id])
}

export const deletePost = async (id) => {
    return await query("DELETE FROM POST WHERE Id = ?",
        [id]);
}

export const getPostsByAuthor = async (author) => {
    return await query("SELECT p.Id as PostId, p.Title, p.Text, p.Date, p.Author, p.Category, p.Avatar, c.Name, c.Id as " +
        "CategoryId, c.Details FROM POST p LEFT JOIN POST_CATEGORY as c ON p.Category=c.Id LEFT JOIN USER " +
        "as u ON p.Author=u.Id WHERE p.Author = ? ORDER BY p.Date",
        [author]) ;
}

export const getPostsByAuthorByCategory = async (author, category) => {
    return await query("SELECT p.Id as PostId, p.Title, p.Text, p.Date, p.Author, p.Category, p.Avatar, c.Name, c.Id as " +
        "CategoryId, c.Details FROM POST p LEFT JOIN POST_CATEGORY as c ON p.Category=c.Id LEFT JOIN USER " +
        "as u ON p.Author=u.Id WHERE p.Author = ? AND c.Id = ? ORDER BY p.Date",
        [author, category]) ;
}

export const getPostsByCategoryNoAuthor = async (author, category) => {
    return await query("SELECT p.Id as PostId, p.Title, p.Text, p.Date, p.Author, p.Category, p.Avatar, c.Name, c.Id as " +
        "CategoryId, c.Details FROM POST p LEFT JOIN POST_CATEGORY as c ON p.Category=c.Id LEFT JOIN USER " +
        "as u ON p.Author=u.Id WHERE p.Author <> ? AND c.Id = ? ORDER BY p.Date",
        [author, category]) ;
}


export const getPosts = async () => {
    return await query("SELECT p.Id as PostId, p.Title, p.Text, p.Date, p.Author, p.Category, p.Avatar, c.Name, c.Id as " +
        "CategoryId, c.Details, " +
        "u.FirstName, u.LastName " +
        " FROM POST p LEFT JOIN POST_CATEGORY as c ON p.Category=c.Id LEFT JOIN USER " +
        "as u ON p.Author=u.Id ORDER BY p.Date");
}

export const getPostsNotAuthor = async (author) => {
    return await query("SELECT p.Id as PostId, p.Title, p.Text, p.Date, p.Author, p.Category, p.Avatar, c.Name, c.Id as " +
        "CategoryId, c.Details, " +
        "u.FirstName, u.LastName " +
        " FROM POST p LEFT JOIN POST_CATEGORY as c ON p.Category=c.Id LEFT JOIN USER " +
        "as u ON p.Author=u.Id WHERE u.Id <> ? ORDER BY p.Date", [author]);
}

export const getCategories = async () => {
    return await query("SELECT * FROM POST_CATEGORY");
}

export const getCategoryById = async (id) => {
    return await query("SELECT * FROM POST_CATEGORY WHERE Id = ?", [id]);
}

export const getPostsByCategory = async (category) => {
    return await query("SELECT p.Id as PostId, p.Title, p.Text, p.Date, p.Author, p.Category, p.Avatar, c.Name, c.Id as " +
        "CategoryId, c.Details FROM POST p LEFT JOIN POST_CATEGORY as c ON p.Category=c.Id LEFT JOIN USER " +
        "as u ON p.Author=u.Id WHERE p.Category = ? ORDER BY p.Date", [category]);
}