import { Request, Response } from 'express';
import Person from '../models/person.model';
import personRepository from '../repositories/person.repository';
import { ValidationError } from 'sequelize';
import ErrorHandler from '../helpers/error-handle.helper';

export default class PersonController {
    async create(req: Request, res: Response) {
        try {
            const person: Person = req.body;
            const savedPerson = await personRepository.create(person);

            res.status(201).send(savedPerson);
        } catch (err) {
            if (err instanceof ValidationError) {
                return ErrorHandler.handleValidationError(err, res);
            }
            ErrorHandler.handleGenericError(err, res);
        }
    }
}
