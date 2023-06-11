import {query} from "../index.js";


export const createResponse = async (text, author, post, type, date) => {
    return await query("INSERT INTO RESPONSE(Text, Author,Post, Type, Date, Status) values(?,?,?,?,?,?)",
        [text, author, post, type, date, "unaccepted"])
}

export const updateResponse = async (id, text) => {
    return await query("UPDATE RESPONSE SET Text = ? WHERE Id = ?",
        [text, id])
}

export const deleteResponse = async (id) => {
    return await query("DELETE FROM RESPONSE WHERE Id = ?",
        [id]);
}

export const getResponse = async (id) => {
    return await query("SELECT * FROM RESPONSE WHERE Id = ? ",
        [id]);
}

export const getResponsesByAuthor = async (author) => {
    return await query("SELECT r.Id as ResponseId, r.Author, r.Text as ResponseText, r.Type, r.Status, r.Date as ResponseDate, r.post as PostId, p.Title, p.Text, p.Date, p.Author, p.Category, p.Avatar, c.Name, " +
        "u.FirstName," +
        " u.LastName  FROM RESPONSE r LEFT JOIN POST p ON p.Id=r.Post LEFT JOIN USER as u ON p.Author=u.Id LEFT JOIN" +
        " POST_CATEGORY c ON c.Id=p.Category  WHERE r.Author = ? ORDER BY Status ASC",
        [author]);
}

export const getResponsesByPost = async (post) => {
    return await query("SELECT r.Id as ResponseId, r.Text as ResponseText, r.Type, r.Status," +
        " r.Date as ResponseDate, r.post as PostId, u.Email, u.FirstName, u.LastName, u.Phone, u.Avatar" +
        " FROM RESPONSE r LEFT JOIN USER u ON u.Id=r.Author WHERE POST = ? ORDER BY Status DESC",
        [post]);
}

export const updatePostAcceptance = async (id) => {
    return await query("UPDATE RESPONSE SET Status = ? WHERE Id = ?",
        ['accepted', id])
}