import { DataTypes } from "sequelize"
import db from "../database/db.js"

const UserModel = db.define("users", {
    user_name: {type: DataTypes.STRING, field: 'user_name'},
    email: {type: DataTypes.STRING, field: 'email'},
    password: {type: DataTypes.STRING, field: 'password'}
}, {
    timestamps: false
})

export default UserModel;