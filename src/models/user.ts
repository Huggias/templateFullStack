import bcrypt from "bcrypt-nodejs";

import {
    Model,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
  } from "sequelize";

import { Purchase } from "./purchase";

interface UserAttributes {
    id: number,
    email: String,
    username: String,
    password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {} // set the id attribute optional for create

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPurchases!: HasManyGetAssociationsMixin<Purchase>; // Note the null assertions!
    public addPurchase!: HasManyAddAssociationMixin<Purchase, number>;
    public hasPurchase!: HasManyHasAssociationMixin<Purchase, number>;
    public countPurchases!: HasManyCountAssociationsMixin;
    public createPurchase!: HasManyCreateAssociationMixin<Purchase>;

    public readonly purchases?: Purchase[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        purchases: Association<User, Purchase>;
    };

    public static encryptPassword(password: string): string{
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    public comparePassword(password: string): boolean{
        return bcrypt.compareSync(password, this.password);
    }

    public static sumar(num1:number, num2:number){
        return num1 + num2;
    }

}
