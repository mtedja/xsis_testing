import { Request, Response } from 'express';
import Joi from 'joi';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response';

import { Movies } from '../models/movies';

const MovieSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().required(),
    image: Joi.string().required(),
});

export const getAllMovie = async (req: Request, res: Response) => {
    try {
        const allMovie: Movies[] = await Movies.findall();

        sendSuccessResponse(res, 200, '', allMovie);
    } catch (error) {
        console.error('Failed to get all movie:', error);
        sendErrorResponse(res, 500, 'Failed to get all movie.', error);
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const movie: Movies | null = await Movies.findUnique(id);

        await Movies.destroy({ where: { id } });
        sendSuccessResponse(res, 200, '', movie);
    } catch (error) {
        console.error('Failed to get movie:', error);
        sendErrorResponse(res, 500, 'Failed to get movie.', error);
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { error, value } = MovieSchema.validate(req.body);

    if (error) {
        sendErrorResponse(res, 400, error.details[0].message);
        return;
    }

    const { title, description, rating, image } = value;

    try {
        const createmovies = await Movies.create({
            title,
            description,
            rating,
            image,
        })

        sendSuccessResponse(res, 201, 'Movie created successfully', createmovies);
    } catch (error) {
        console.error('Failed to create movie:', error);
        sendErrorResponse(res, 500, 'Failed to create movie.', error);
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { error, value } = MovieSchema.validate(req.body);

    if (error) {
        sendErrorResponse(res, 400, error.details[0].message);
        return;
    }

    const { title, description, rating, image } = value;
    const { id } = req.params;

    try {
        await Movies.update({
            title,
            description,
            rating,
            image,
        }, { where: { id } });

        const updateMovie: Movies | null = await Movies.findUnique(id);
        sendSuccessResponse(res, 200, 'Movie deleted successfully', updateMovie);
    } catch (error) {
        console.error('Failed to delete movie:', error);
        sendErrorResponse(res, 500, 'Failed to delete movie.', error);
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleteMovie: Movies | null = await Movies.findUnique(id);

        await Movies.destroy({ where: { id } });
        sendSuccessResponse(res, 200, 'Movie deleted successfully', deleteMovie);
    } catch (error) {
        console.error('Failed to delete movie:', error);
        sendErrorResponse(res, 500, 'Failed to delete movie.', error);
    }
}