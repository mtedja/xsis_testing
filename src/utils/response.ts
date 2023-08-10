import { Response } from 'express';

interface ApiResponse {
    status: string;
    message: string;
    data?: any;
    error?: any;
}

export const sendSuccessResponse = (res: Response, status: number, message = 'Success', data?: any): void => {
    const response: ApiResponse = {
        status: "success",
        message,
    };

    if (data) {
        response.data = data;
    }

    res.status(status).json(response);
};

export const sendErrorResponse = (res: Response, status: number, message: string, error?: any): void => {
    const response: ApiResponse = {
        status: "error",
        message,
    };

    if (error) {
        response.error = error;
    }

    res.status(status).json(response);
};
