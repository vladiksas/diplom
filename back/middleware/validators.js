import {body} from "express-validator"

export const registrationValidator = [
    body("email", "Неправильний формат пошти").isEmail(),
    body("password", "Пароль повинен бути не коротшим 6 символів").isLength({min: 6}),
    body("firstName", "Ім'я повинно містити не менше 3 літер").isLength({min: 3}),
    body("lastName", "Прізвище повинно містити не менше 3 літер").isLength({min: 3}),
    body("phone", "Неправильний формат телефону").isMobilePhone("uk-UA"),
    body("avatar").optional()
]
export const loginValidator = [
    body("email", "Неправильний формат пошти").isEmail(),
    body("password", "Пароль повинен бути не коротшим 6 символів").isLength({min: 6}),
]

export const updateValidator = [
    body("email", "Неправильний формат пошти").isEmail(),
    body("firstName", "Ім'я повинно містити не менше 3 літер").isLength({min: 3}),
    body("lastName", "Прізвище повинно містити не менше 3 літер").isLength({min: 3}),
    body("phone", "Неправильний формат телефону").isMobilePhone("uk-UA"),
    body("avatar").optional(),
]
export const passwordValidator = [
    body("password", "Пароль повинен бути не коротшим 6 символів").isLength({min: 6})
]

export const postValidator = [
    body("title", "Заголовок повинен бути не менше 5 символів").isLength({min: 5}),
    body("text", "Текст повинен бути не коротшим 20 символів").isLength({min: 20}),
    body("avatar").optional()
]


export const responseValidator = [
    body("text", "Текст повинен бути не коротшим 20 символів").isLength({min: 20})
]
