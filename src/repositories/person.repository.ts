import Person from '../models/person.model';

interface IPersonRepository {
    create(person: Person): Promise<Person>;
}

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
}

export default new PersonRepository();
