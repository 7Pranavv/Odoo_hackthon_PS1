import {body} from 'express-validator'

const userRegistrationValidator = () => {
    return [
        body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
        body('name')
        .trim()
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .isLength({ max: 15 }).withMessage('Name must be at most 15 characters long')
        .notEmpty().withMessage('Name is required'),
        body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
    ]
}

const userLoginValidator = () => {
    return [
        body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
        body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
    ]
}


export {userRegistrationValidator, userLoginValidator}