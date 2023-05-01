import db from "./db.js";

const dbConnection = async () => {
    try {
        await db.authenticate();
        console.log("¡The connection to the database was successful!");
    } catch (error) {
        console.log(`There was an error connecting to the database: ${error}`);
    }
}

export default dbConnection;