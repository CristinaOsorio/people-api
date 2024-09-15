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
    }
}

export default new PersonRoutes().router;
