import { Request, Response } from 'express';
import Person from '../models/person.model';
import personRepository from '../repositories/person.repository';
import { ValidationError } from 'sequelize';
import ErrorHandler from '../helpers/error-handle.helper';
import { isNumeric } from '../helpers/is-number.helper';

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

    async findAll(req: Request, res: Response) {
        const { filterParam, page = 1, pageSize = 10 } = req.query;

        try {
            let pageNumber = 1;
            let size = 10;

            if (isNumeric(page) && isNumeric(pageSize)) {
                pageNumber = parseInt(page as string, 10);
                size = parseInt(pageSize as string, 10);
            }

            const { rows, count } = await personRepository.getAll(
                pageNumber,
                size,
                filterParam as string
            );

            res.status(200).send({
                data: rows,
                totalItems: count,
                currentPage: pageNumber,
                pageSize: size,
                totalPages: Math.ceil(count / size),
            });
        } catch (err) {
            ErrorHandler.handleGenericError(err, res);
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const person = await personRepository.getOne(id);
            if (person) return res.status(200).send(person);

            ErrorHandler.handleNotFound(res, 'Not Found');
        } catch (err) {
            ErrorHandler.handleGenericError(err, res);
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            firstName,
            lastNamePaternal,
            lastNameMaternal,
            address,
            phone,
        } = req.body;
        const personId = Number(id);

        try {
            const updatedPerson = await personRepository.update(personId, {
                firstName,
                lastNamePaternal,
                lastNameMaternal,
                address,
                phone,
            });

            res.status(200).json(updatedPerson);
        } catch (err: any) {
            if (err instanceof ValidationError) {
                return ErrorHandler.handleValidationError(err, res);
            }

            if (err.message === 'Not Found') {
                return ErrorHandler.handleNotFound(res, err.message);
            }

            ErrorHandler.handleGenericError(err, res);
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            await personRepository.delete(id);

            res.status(204).send();
        } catch (err: any) {
            if (err.message === 'Not Found') {
                return ErrorHandler.handleNotFound(res, err.message);
            }

            ErrorHandler.handleGenericError(err, res);
        }
    }
}
