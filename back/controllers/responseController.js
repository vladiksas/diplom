import {validationResult} from "express-validator";
import {
    createResponse,
    getResponsesByAuthor,
    updatePostAcceptance,
    deleteResponse,
    getResponse,
    updateResponse,
    getResponsesByPost
} from "../services/responseService.js";


export const createResponseInfo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        let now = new Date()
        now = now.toISOString().split('T')[0]

        await createResponse(req.body.text, req.User, req.body.post, req.body.type, now)

        res.status(201).json();

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Створення відгука не здійснено"
            }
        )
    }
}

export const updateResponseInfo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        await updateResponse(req.params.id, req.body.text)
        let response =  await getResponse(req.params.id)
        response = response[0]

        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Редагування поста не здійснено"
            }
        )
    }
}

export const removeResponseInfo = async (req, res) => {
    try {
        await deleteResponse(req.params.id)

        res.status(204).json();

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Відгук не видалено"
            }
        )
    }
}

export const getUserResponses = async (req, res) => {
    try {
        const responses = await getResponsesByAuthor(req.User)
        res.json(responses);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Відгуки не знайдено"
            }
        )
    }
}

export const getPostResponses = async (req, res) => {
    try {
        const responses = await getResponsesByPost(req.params.post)
        res.json(responses);
    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Відгуки не знайдено"
            }
        )
    }
}
export const getResponseInfo = async (req, res) => {
    try {

        let response = await getResponse(req.params.id)
        response = response[0]

        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Відгук не знайдено"
            }
        )
    }
}

export const makeResponseAccepted = async (req, res) => {
    try {
        await updatePostAcceptance(req.params.id)
        let response = await getResponse(req.params.id)
        response = response[0]

        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: "Не вдалось узгодити відгук"
            }
        )
    }
}