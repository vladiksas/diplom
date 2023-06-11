import {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    updateUsersPassword,
    deleteUserById
} from "../services/userService.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {validationResult} from "express-validator";

export const registration = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        const oldUser = await getUserByEmail(req.body.email)

        if (oldUser.length !== 0) {
            return res.status(404).json({
                message: "Така пошта вже існує"
            })
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(5);
        const passwordHash = await bcrypt.hash(password, salt);

        await createUser(req.body.email, passwordHash, req.body.firstName, req.body.lastName, req.body.phone, req.body.avatar)
        res.status(201).json();

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Регістрація не здійснена, спробуйте інший номер телефону"
            }
        )
    }
}

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        let user = await getUserByEmail(req.body.email)

        if (user.length === 0) {
            return res.status(404).json({
                message: "Такого користувача не існує"
            })
        }

        user = user[0]

        const validPassword = await bcrypt.compare(req.body.password, user.Password)


        if (!validPassword) {
            return res.status(404).json({
                message: "Неправильні дані"
            })
        }

        const token = jwt.sign({
                id: user.Id,
                email: req.body.email,
            }
            , "vlad", {
                expiresIn: '5d',
            });

        res.json({user, token});

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Вхід не виконано"
            }
        )
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await deleteUserById(req.User)
        res.status(204).json();

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Видалення акаунту не здійснено"
            }
        )
    }
}

export const updateAccount = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        await updateUser(req.User, req.body.email, req.body.firstName, req.body.lastName, req.body.phone, req.body.avatar)
        let user = await getUserById(req.User)
        user = user[0]

        const token = jwt.sign({
                id: user.Id,
                email: req.body.email,
            }
            , "vlad", {
                expiresIn: '5d',
            });

        res.json({user, token});

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Оновлення профілю не здійснено"
            }
        )
    }
}

export const changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(5);
        const passwordHash = await bcrypt.hash(password, salt);

        await updateUsersPassword(req.User, passwordHash)
        let user = await getUserById(req.User)
        user = user[0]

        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Не вдалось змінити пароль"
            }
        )
    }
}

export const getUser = async (req, res) => {
    try {
        let user = await getUserById(req.User)
        user = user[0]

        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Не вдалось отримати корстувача"
            }
        )
    }
}

export const getUserByParams = async (req, res) => {
    try {
        let user = await getUserById(req.params.id)
        user = user[0]

        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Не вдалось отримати корстувача"
            }
        )
    }
}