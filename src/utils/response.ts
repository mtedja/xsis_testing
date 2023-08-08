import { Response } from 'express';

interface ApiResponse {
    status: number;
    message: string;
    data?: any;
    error?: any;
}

export const sendSuccessResponse = (res: Response, status: number, message = 'Success', data?: any): void => {
    const response: ApiResponse = {
        status: 1,
        message,
    };

    if (data) {
        response.data = data;
    }

    res.status(status).json(response);
};

export const sendErrorResponse = (res: Response, status: number, message: string, error?: any): void => {
    const response: ApiResponse = {
        status: 0,
        message,
    };

    if (error) {
        response.error = error;
    }

    res.status(status).json(response);
};
