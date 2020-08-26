import { Purchase } from "./purchase";
import { User } from "./user";
import { DataTypes } from "sequelize";
import {sequelize} from "../database";



export function init(){
    // inits

    User.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            references: {           
                model:"purchases",           
                key:"UserId"         
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
            // unique: true 
        },
        username: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false
            
        }
    },{
        tableName: 'users',
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });


    Purchase.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        }
    }, {
        tableName:'purchases', 
        sequelize,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      });
}

export function assosiations(){
    Purchase.belongsTo(User, {onDelete: 'CASCADE'});

    User.hasMany(Purchase, {
        sourceKey: "id",
        as: "purchases", // this determines the name in `associations`!
    });
}

export function syncs(){
    User.sync({alter: true}); 
    Purchase.sync({alter: true});
}