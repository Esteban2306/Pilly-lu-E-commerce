import { JwtPayload } from "jsonwebtoken";
import { Express } from "express";

export interface CustomJwtPayload extends JwtPayload {
    role: string;
    sub: string;
}

declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
        userRole?: string;
    }
}