import { Router } from 'express';
import { welcomeMessage } from '../controllers/welcomeController';
import {
    getAllMovie,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} from '../controllers/movieController';

const router = Router();

router.get('/', welcomeMessage);
router.get('/Movies', getAllMovie);
router.get('/Movies/:id', getMovieById);
router.post('/Movies', createMovie);
router.patch('/Movies/:id', updateMovie);
router.delete('/Movies/:id', deleteMovie);

export default router;
