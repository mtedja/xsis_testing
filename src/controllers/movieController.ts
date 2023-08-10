import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response';

const prisma = new PrismaClient();

const movieSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    rating: Joi.number().required(),
    image: Joi.string().allow(''),
});

export const listMovie = async (req: Request, res: Response) => {
    try {
        const movies = await prisma.movies.findMany();

        sendSuccessResponse(res, 200, '', movies);
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        sendErrorResponse(res, 500, 'Failed to fetch movies.', error);
    }
}

export const detailMovie = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const movie = await prisma.movies.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        sendSuccessResponse(res, 200, '', movie);
    } catch (error) {
        console.error('Failed to fetch movie details:', error);
        sendErrorResponse(res, 500, 'Failed to fetch movie details.', error);
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { error, value } = movieSchema.validate(req.body);

    if (error) {
        sendErrorResponse(res, 400, error.details[0].message);
        return;
    }

    const { title, description, rating, image } = value;

    try {
        const movie = await prisma.movies.create({
            data: {
                title,
                description,
                rating,
                image
            }
        });

        sendSuccessResponse(res, 201, 'Movie created successfully', movie);
    } catch (error) {
        console.error('Failed to create movie:', error);
        sendErrorResponse(res, 500, 'Failed to create movie.', error);
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error, value } = movieSchema.validate(req.body);

    if (error) {
        sendErrorResponse(res, 400, error.details[0].message);
        return;
    }

    const { title, description, rating, image } = value;

    try {
        const updatedMovie = await prisma.movies.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                description,
                rating,
                image
            }
        });

        sendSuccessResponse(res, 200, 'Movie updated successfully', updatedMovie);
    } catch (error) {
        console.error('Failed to update movie:', error);
        sendErrorResponse(res, 500, 'Failed to update movie.', error);
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedMovie = await prisma.movies.delete({
            where: {
                id: parseInt(id)
            }
        });

        sendSuccessResponse(res, 200, 'Movie deleted successfully', deletedMovie);
    } catch (error) {
        console.error('Failed to delete movie:', error);
        sendErrorResponse(res, 500, 'Failed to delete movie.', error);
    }
}