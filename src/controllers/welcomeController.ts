import { Request, Response } from 'express';
import { sendSuccessResponse } from '../utils/response';

export function welcomeMessage(req: Request, res: Response) {
    sendSuccessResponse(res, 200, 'Welcome to my API');
}