import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { ALPHA_REGEX, PHONE_NUMBER_REGEX } from '../constants/regex.constant';

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
            is: {
                args: ALPHA_REGEX,
                msg: 'First name can only contain letters, spaces, apostrophes, and hyphens, and must be correctly formatted.',
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
            is: {
                args: ALPHA_REGEX,
                msg: 'Paternal last name can only contain letters, spaces, apostrophes, and hyphens, and must be correctly formatted.',
            },
            len: {
                args: [1, 60],
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
            is: {
                args: ALPHA_REGEX,
                msg: 'Maternal last name can only contain letters, spaces, apostrophes, and hyphens, and must be correctly formatted.',
            },
            len: {
                args: [1, 60],
                msg: 'Maternal last name must be between 1 and 60 characters long.',
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
                args: [1, 100],
                msg: 'Address must be between 1 and 100 characters long.',
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
            is: {
                args: PHONE_NUMBER_REGEX,
                msg: 'Phone number must contain exactly 10 numerical digits.',
            },
        },
    })
    phone!: string;
}
