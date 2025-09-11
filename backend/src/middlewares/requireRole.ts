import { Request, Response, NextFunction } from "express";
import Forbiden from "./forbiden";
import { Role } from "../models/role";
import { User } from "../models/users";

// export const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
//     const role = res.locals.userRole

//     if (!role || !roles.includes(role)) {
//         throw new Forbiden('Role forbiden')
//     }

//     next();
// }

export const requireRole = (...roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.userID;
        if (!userId) throw new Forbiden("User not authenticated");

        const user = await User.findById(userId).populate("role");
        if (!user || !user.role) throw new Forbiden("User has no role");

        const roleName = typeof user.role === "string" ? user.role : user.role.name;

        if (!roles.includes(roleName)) {
            throw new Forbiden("Role forbidden");
        }

        next();
    } catch (err) {
        next(err);
    }
};