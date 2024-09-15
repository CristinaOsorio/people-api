import { ValidationError } from 'sequelize';
import { Response } from 'express';

class ErrorHandler {
    public static handleValidationError(err: ValidationError, res: Response) {
        const validationErrors = err.errors.map((error) => ({
            field: error.path,
            message: error.message,
            validatorKey: error.validatorKey,
        }));

        res.status(400).send({
            message: 'Errores de validación',
            errors: validationErrors,
        });
    }

    public static handleGenericError(err: any, res: Response) {
        res.status(500).send({
            message: 'Ocurrió un error inesperado',
        });
    }
}

export default ErrorHandler;
