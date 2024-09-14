import express from 'express';
import dotenv from 'dotenv';
import personRoutes from './routes/person.route';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/persons', personRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
