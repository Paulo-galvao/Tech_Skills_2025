import mongoose from "mongoose";
import "dotenv/config";
const connection = process.env.CONNECTION_DB as string;

async function main():Promise<string|void> {
    try {
        await mongoose.connect(connection);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

main();

export default mongoose; 