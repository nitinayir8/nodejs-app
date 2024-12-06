import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

// Call dotenv.config() to load environment variables from .env file
dotenv.config();

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
//mongodb+srv://devavratsingh2002:<db_password>@cluster0.ml9lh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const connectionString = `mongodb+srv://integrationninjas:${password}@cluster0.ml9lh.mongodb.net/?retryWrites=true&w=majority&appName=dev-cluster`; // clustore url
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection successful")
} catch(e) {
  console.error(e);
}
let db = conn.db("integration_ninjas");
export default db;
