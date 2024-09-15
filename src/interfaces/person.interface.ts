import Person from '../models/person.model';

export interface IPersonRepository {
    create(person: Person): Promise<Person>;
    getAll(
        page: number,
        limit: number,
        searchParam?: string
    ): Promise<{ rows: Person[]; count: number }>;
    getOne(id: number): Promise<Person | null>;
    update(id: number, person: Person): Promise<Person>;
    delete(id: number): Promise<void>;
}
