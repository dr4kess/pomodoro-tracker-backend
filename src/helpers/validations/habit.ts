import { body } from "express-validator";

export const createHabitValidation = [
    body('title', 'Name is required and should be at least 3 characters long').isLength({ min: 3 }).isString(),
    body('count', 'Count is required and should be a positive integer').isInt({ min: 1 }),
    body('color', 'Color should be a valid hex code').optional().isString(),
];