import { Router } from "express";
import { getUserById, loginUser, registerUSer, createRol } from "../controllers/users.controller";
import { authenticate } from "../middlewares/auth";
import { requireRole } from "../middlewares/requireRole";

const router = Router()

router.post('/signIn', loginUser)
router.post('/signUp', registerUSer)
router.post('/createRole', createRol)

router.get('/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), getUserById)



export default router