import { Router } from "express";
import { createCategory, getCategory } from "../controllers/category.controller";

const router = Router()

router.get('/', getCategory)
router.post('/', createCategory)

export default router