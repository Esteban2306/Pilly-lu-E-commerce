import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { CustomJwtPayload } from "./types/authTypes/type";

const jwtSecret = process.env.JWT_SECRET || "some-secret-key";



export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const payload = Jwt.verify(token, jwtSecret) as CustomJwtPayload;

        req.userId = payload.sub;
        req.userRole = payload.role;

        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
