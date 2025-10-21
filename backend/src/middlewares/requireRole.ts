import { Request, Response, NextFunction } from "express";
import Forbiden from "./forbiden.js";

import { Role } from "../models/role.js";
import { User } from "../models/users.js";

export const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const role = req.userRole

    if (!role || !roles.includes(role)) {
        throw new Forbiden('Role forbiden')
    }

    next();
}

// export const requireRole = (...roles: string[]) => async (req: Request & RequestTypes, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.userId;
//         if (!userId) throw new Forbiden("User not authenticated");

//         const user = await User.findById(userId).populate("role");
//         if (!user || !user.role) throw new Forbiden("User has no role");

//         const roleName = typeof user.role === "string" ? user.role : user.role.name;

//         if (!roles.includes(roleName)) {
//             throw new Forbiden("Role forbidden");
//         }

//         next();
//     } catch (err) {
//         next(err);
//     }
// };