import { body } from "express-validator";

export const createTaskValidation = [
    body('title', 'Title is required').isLength({min: 5}).isString(),
    body('dueDate', 'Valid due date is required').isISO8601().toDate(),
    body('habitId', 'Valid habitId is required').optional().isMongoId()
];