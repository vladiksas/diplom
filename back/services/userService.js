import {query} from "../index.js";


export const createUser = async (email, password, firstName, lastName, phone, avatar) => {
     return await query("INSERT INTO USER(Email, Password, FirstName, LastName, Phone, Avatar) values(?,?,?,?,?,?)",
        [email, password, firstName, lastName, phone, avatar])

}

export const updateUser = async (id, email, firstName, lastName, phone, avatar) => {
    return await query("UPDATE USER SET Email = ?, FirstName = ?, LastName = ?, Phone = ?, Avatar = ?  WHERE Id = ?",
        [email, firstName, lastName, phone, avatar, id])

}

export const updateUsersPassword = async (id, password) => {
    return await query("UPDATE USER SET Password = ? WHERE Id = ?",
        [password, id])
}

export const getUserById = async (id) => {
    return await query("SELECT * FROM USER WHERE Id = ?",
        [id]);
}

export const getUserByEmail = async (email) => {
    return await query("SELECT * FROM USER WHERE Email = ?",
      [email]);
}

export const deleteUserById = async (id) => {
    return await query("DELETE FROM USER WHERE Id = ?",
        [id]);
}

