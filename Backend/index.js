import express from 'express';
import cors from "cors";
import dbConnection from './database/dbConnection.js';
import router from "./routes/router.js"
const PORT = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router)

dbConnection();

app.listen(PORT, () => {
    console.log(`Server active in http://localhost:${PORT}`)
})
