import { Router } from 'express';
import PersonController from '../controllers/person.controller';

class PersonRoutes {
    router = Router();
    controller = new PersonController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/', this.controller.create);

        this.router.get('/', this.controller.findAll);

        this.router.get('/:id', this.controller.findOne);

        this.router.put('/:id', this.controller.update);

        this.router.delete('/:id', this.controller.delete);
    }
}

export default new PersonRoutes().router;
