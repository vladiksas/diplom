import jwt from "jsonwebtoken"
export const checkUser = (req, res, next) => {
    const token = (req.headers.authorization || "Empty").replace(/Bearer\s?/, "");
    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'vlad');
                req.User = decodedToken.id;
                next();
        } catch (err) {
            console.log(err)
            res.status(403).json({
                message: "Не авторизований!"
            })
        }
    } else {
        return res.status(403).json({
            message: "Не авторизований"
        })
    }
}