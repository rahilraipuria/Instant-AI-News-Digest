import { Router } from "express"
import { generateQuestions, summarize } from "../controllers/news.controller.js"
const router= Router()


router.route("/generateQuiz").post(generateQuestions)
router.route("/summarize").post(summarize)
export default router