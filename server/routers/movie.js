import express from 'express'
import { updateMovieBtnLike, getMovies } from '../controller/movies'

const router = express.Router()

router.get('/', getMovies)
router.put('/updateLike', updateMovieBtnLike)

export default router