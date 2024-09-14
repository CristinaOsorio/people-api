import { Request, Response } from 'express';

export default class PersonController {
    async create(req: Request, res: Response) {
        try {
            res.status(201).json({
                ...req.body,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error!',
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            res.status(200).json({
                data: [],
            });
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error!',
            });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            res.status(200).json({
                id: req.params.id,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error!',
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            res.status(200).json({
                id: req.params.id,
                ...req.body,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error!',
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            res.status(200).json({ id: req.params.id });
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error!',
            });
        }
    }
}
