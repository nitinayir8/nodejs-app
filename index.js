
import express from 'express';
import client from './mongoC.js';

const port = process.env.PORT || 3000;
const app = express();

// Middleware to set CORS headers
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Middleware to parse JSON request bodies
app.use(express.json()); // Replaces body-parser.json()

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true })); // Replaces body-parser.urlencoded()

// Route to test the server
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

// Route to add a user
app.post('/addUser', async (req, res) => {
    try {
        let collection = await client.collection("users");
        let newDocument = req.body;
        newDocument.date = new Date();
        let result = await collection.insertOne(newDocument);
        console.log("Request Body: ", req.body);
        res.status(204).send(result); // Send status code 204 (No Content)
    } catch (error) {
        console.error("Error inserting user: ", error);
        res.status(500).send("Error adding user");
    }
});

// Route to get all users
app.get('/getUsers', async (req, res) => {
    try {
        let collection = await client.collection("users");
        let results = await collection.find({}).toArray();
        res.status(200).send(results); // Send status code 200 (OK)
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).send("Error fetching users");
    }
});

// Start the server
app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});
