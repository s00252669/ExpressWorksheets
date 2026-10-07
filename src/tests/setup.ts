import { connectDB, disconnectDB} from "../config/database";
import { beforeAll, afterAll } from "vitest";
beforeAll(async () => {
    console.log('Run once before tests');
   await connectDB();
});
afterAll(async () => {
    console.log('Run once after tests');
   await disconnectDB();
});

