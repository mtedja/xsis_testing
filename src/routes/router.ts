import { Router } from 'express';
import { welcomeMessage } from '../controllers/welcomeController';
import { listMovie, createMovie, detailMovie, updateMovie, deleteMovie } from '../controllers/movieController';

const router = Router();

// WELCOME ROUTE
router.get('/', welcomeMessage);

// MOVIE ROUTES
router.get('/movies', listMovie);
router.post('/movies', createMovie);
router.get('/movies/:id', detailMovie);
router.patch('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

export default router;