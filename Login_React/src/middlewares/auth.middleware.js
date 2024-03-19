import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/index.js";

const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" })
        }
        req.user = user;
        next()
    })
}

export {
    authRequired
}