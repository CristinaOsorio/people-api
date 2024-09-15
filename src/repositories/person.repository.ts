import { Op } from 'sequelize';
import { IPersonRepository } from '../interfaces/person.interface';
import Person from '../models/person.model';

class PersonRepository implements IPersonRepository {
    async create(person: Person): Promise<Person> {
        return await Person.create({
            firstName: person.firstName,
            lastNamePaternal: person.lastNamePaternal,
            lastNameMaternal: person.lastNameMaternal,
            address: person.address,
            phone: person.phone,
        });
    }

    async getAll(
        page: number = 1,
        limit: number = 10,
        filterParam: string = ''
    ): Promise<{ rows: Person[]; count: number }> {
        const condition = this.buildSearchCondition(filterParam);

        try {
            const { count, rows } = await Person.findAndCountAll({
                where: condition,
                limit: limit,
                offset: (page - 1) * limit,
            });

            return { rows, count };
        } catch (error) {
            console.error('Error fetching persons:', error);
            throw new Error('Failed to retrieve persons.');
        }
    }

    async getOne(id: number): Promise<Person | null> {
        return await Person.findByPk(id);
    }

    async update(id: number, updateData: Partial<Person>): Promise<Person> {
        try {
            const person = await this.getOne(id);

            if (!person) {
                throw new Error('Not Found');
            }

            return await person.update({ ...updateData });
        } catch (error) {
            throw error;
        }
    }

    private buildSearchCondition = (filterParam?: string) => {
        const condition: { [Op.or]?: any[] } = {};

        if (filterParam && filterParam.trim() !== '') {
            condition[Op.or] = [
                { firstName: { [Op.like]: `%${filterParam}%` } },
                { lastNamePaternal: { [Op.like]: `%${filterParam}%` } },
                { lastNameMaternal: { [Op.like]: `%${filterParam}%` } },
            ];
        }

        return condition;
    };
}

export default new PersonRepository();
