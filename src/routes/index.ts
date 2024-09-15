import { Application } from 'express';
import personRoutes from './person.routes';

export default class Routes {
    constructor(app: Application) {
        app.use('/api/persons', personRoutes);
    }
}
