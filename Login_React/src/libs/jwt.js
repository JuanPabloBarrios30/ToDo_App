import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_EXPIRES } from "../config/index.js";

function createAccesToken(payload) {
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            SECRET_KEY,
            { expiresIn: TOKEN_EXPIRES },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        )
    });
}

export{
    createAccesToken
}