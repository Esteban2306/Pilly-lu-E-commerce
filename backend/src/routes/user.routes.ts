import { Router } from "express";
import { getUserById, loginUser, registerUSer, createRol, getAllUsers, delteUser } from "../controllers/users.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = Router()

router.post('/signIn', loginUser)
router.post('/signUp', registerUSer)
router.post('/createRole', createRol)

router.get('/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), getUserById)
router.get('/', authenticate, requireRole('68c448d6b93e0784df24f2ce'), getAllUsers)
router.delete('/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), delteUser)



export default router