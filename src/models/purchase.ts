import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
  } from "sequelize";

import { sequelize } from "../database";
import { User } from "./user";

interface PurchaseAttributes {
    id: number,
    // idUser: number,
    price: number,
    description?: string
}

interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, "id"> {} // set the id attribute optional for create

export class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
    public id!: number;
    // public idUser!: number;
    public price!: number;
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    
}



