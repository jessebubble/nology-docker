import dotenv from "dotenv"

dotenv.config();

const database = `mongodb://${process.env.DB_PATH}:27017/students`;
const testDatabase = `mongodb://${process.env.DB_PATH}:27017/students_test`;

export { database, testDatabase };


