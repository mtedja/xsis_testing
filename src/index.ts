import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import appRouter from './routes/router';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const swaggerFile = path.join(__dirname, 'docs', 'swagger.json');
const swaggerSpec = require(swaggerFile);

app.use(express.json());

app.use('/api', appRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to running server:', error);
    }
});

export { app, server };