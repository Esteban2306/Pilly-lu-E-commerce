import { Router } from "express";
import { getUserById, loginUser, registerUSer } from "../controllers/users.controller";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.post('/signIn', loginUser)
router.post('/signUp', registerUSer)


router.get('/:id', authenticate, getUserById)



export default router