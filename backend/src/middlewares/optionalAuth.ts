import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { CustomJwtPayload } from "./types/authTypes/type";


const jwtSecret = process.env.JWT_SECRET || "some-secret-key";


export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader?.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(" ")[1];
            console.log(token, jwtSecret)
            const payload = Jwt.verify(token, jwtSecret) as CustomJwtPayload;
            console.log(payload)
            req.userId = payload.sub
            req.userRole = payload.role
            console.log(req)

        } catch (err) {
            console.log(err)
        }
    }
    next()
}