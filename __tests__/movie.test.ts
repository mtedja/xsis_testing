import request from 'supertest';
import { app, server } from '../src/index';

describe('Express App', () => {
    afterAll(done => {
        server.close(() => {
            done();
        });
    });

    it('should return welcome message', async () => {
        const response = await request(app).get('/api');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'Welcome to XSIS API!'
        });
    });

    it('should list all movies', async () => {
        const response = await request(app).get('/api/movies');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: '',
            data: expect.any(Array)
        });
    });

    it('should retrieve a movie detail', async () => {
        const response = await request(app).get('/api/movies/2'); // Replace 1 with an actual movie ID

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: '',
            data: expect.any(Object) 
        });
    });

    it('should create a new movie', async () => {
        const newMovie = {
            title: 'New Movie',
            description: 'A new movie description',
            rating: 4.5,
            image: 'movie.jpg'
        };

        const response = await request(app)
            .post('/api/movies')
            .send(newMovie);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 'success',
            message: 'Movie created successfully',
            data: expect.any(Object) 
        });
    });

    it('should update a movie', async () => {
        const updatedMovie = {
            title: 'Updated Movie',
            description: 'An updated movie description',
            rating: 4.8,
            image: 'updated_movie.jpg'
        };

        const response = await request(app)
            .patch('/api/movies/2') // Replace 1 with an actual movie ID
            .send(updatedMovie);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'Movie updated successfully',
            data: expect.any(Object)
        });
    });

    it('should delete a movie', async () => {
        const response = await request(app).delete('/api/movies/6'); // Replace 1 with an actual movie ID

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'Movie deleted successfully',
            data: expect.any(Object)
        });
    });
});
