
// import mongodb from 'mongodb'; 
// const { MongoClient } = mongodb;
// import dotenv from 'dotenv';

// // Call dotenv.config() to load environment variables from .env file
// dotenv.config();


// //mongodb+srv://devavratsingh2002:<db_password>@cluster0.ml9lh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// const connectionString = `mongodb+srv://integrationninjas:${password}@cluster0.ml9lh.mongodb.net/?retryWrites=true&w=majority&appName=dev-cluster`; // clustore url
// const client = new MongoClient(connectionString);
// let conn;
// try {
//   conn = await client.connect();
//   console.log("connection successful")
// } catch(e) {
//   console.error(e);
// }
// let db = conn.db("integration_ninjas");
//export default db;

import mongodb from 'mongodb'; 
const { MongoClient,ServerApiVersion  } = mongodb;
// import { ServerApiVersion } from 'mongodb';
const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const uri = "mongodb+srv://devavratsingh2002:${password}@cluster0.ml9lh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
export default client;
