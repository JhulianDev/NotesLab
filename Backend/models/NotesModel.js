import { DataTypes } from "sequelize"
import db from "../database/db.js"

const NotesModel = db.define("notes", {
    user_id: { type: DataTypes.INTEGER, field: 'user_id' },
    column_id: { type: DataTypes.INTEGER, field: 'column_id' },
    title: {type: DataTypes.STRING, field: 'title'},
    content: {type: DataTypes.STRING, field: 'content'},
    color: { type: DataTypes.STRING, field: 'color' }
}, {
    timestamps: false
})

export default NotesModel;