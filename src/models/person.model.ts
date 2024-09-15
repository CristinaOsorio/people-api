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
                msg: 'First name is a required field.',
            },
            isAlpha: {
                msg: 'First name can only contain letters.',
            },
        },
    })
    firstName!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Paternal last name is a required field.',
            },
            isAlpha: {
                msg: 'Paternal last name can only contain letters.',
            },
            len: {
                args: [3, 60],
                msg: 'Paternal last name must be between 3 and 60 characters long.',
            },
        },
    })
    lastNamePaternal!: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Maternal last name is a required field.',
            },
            isAlpha: {
                msg: 'Maternal last name can only contain letters.',
            },
            len: {
                args: [3, 60],
                msg: 'Maternal last name must be between 3 and 60 characters long.',
            },
        },
    })
    lastNameMaternal!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Address is a required field.',
            },
            len: {
                args: [10, 100],
                msg: 'Address must be between 10 and 100 characters long.',
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
                msg: 'Phone number is a required field.',
            },
            isNumeric: {
                msg: 'Phone number can only contain numbers.',
            },
            len: {
                args: [10, 10],
                msg: 'Phone number must be exactly 10 digits long.',
            },
        },
    })
    phone!: string;
}
