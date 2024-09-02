import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Invalid form of Email.').isEmail(),
    body('password', 'Password must be minimum 5 symbols!').isLength({ min: 5}),
    body('fullName', "Enter your name.").isLength({ min: 3}),
    body('avatarUrl', 'Invaild URL').optional().isURL()
]

export const loginValidation = [
    body('email', 'Invalid form of Email.').isEmail(),
    body('password', 'Password must be minimum 5 symbols!').isLength({ min: 5})
]