import jwt from "jsonwebtoken";

const SECRET_KEY = "web-mobile-api";

export const generateToken = (user) => {
    return jwt.sign(
        {
        userId: user.account_id,
        email: user.email,
        },
        SECRET_KEY,
        { expiresIn: "30 days" }
    );
}

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
}