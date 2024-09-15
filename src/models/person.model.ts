import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'persons',
})
export default class Person extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre es un campo obligatorio.',
            },
            isAlpha: {
                msg: 'El nombre solo debe contener letras.',
            },
        },
    })
    firstName!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El apellido paterno es un campo obligatorio.',
            },
            isAlpha: {
                msg: 'El apellido paterno solo debe contener letras.',
            },
            len: {
                args: [3, 60],
                msg: 'El apellido paterno debe tener entre 3 y 60 caracteres.',
            },
        },
    })
    lastNamePaternal!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El apellido materno es un campo obligatorio.',
            },
            isAlpha: {
                msg: 'El apellido materno solo debe contener letras.',
            },
            len: {
                args: [3, 60],
                msg: 'El apellido materno debe tener entre 3 y 60 caracteres.',
            },
        },
    })
    lastNameMaternal!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La dirección es un campo obligatorio.',
            },
            len: {
                args: [10, 100],
                msg: 'La dirección debe tener entre 10 y 100 caracteres.',
            },
        },
    })
    address!: string;

    @Column({
        type: DataType.STRING(10),
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El teléfono es un campo obligatorio.',
            },
            isNumeric: {
                msg: 'El teléfono solo debe contener números.',
            },
            len: {
                args: [10, 10],
                msg: 'El teléfono debe tener exactamente 10 dígitos.',
            },
        },
    })
    phone!: string;
}
