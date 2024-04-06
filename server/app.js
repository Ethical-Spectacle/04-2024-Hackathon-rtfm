const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection URI (replace with your connection string)
const uri = 'mongodb+srv://hackrtfm:YPpEK604DLIfIb1o@cluster0.lame0pq.mongodb.net/';

// Endpoint to fetch data from MongoDB Atlas
app.get('/api/data', async (req, res) => {
    try {
        // Connect to MongoDB Atlas
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Access the database and collection
        const db = client.db('obdtwo');
        const collection = db.collection('obdtwo');

        // Fetch data from MongoDB
        const data = await collection.find({}).toArray();

        // Close the connection
        await client.close();

        // Send the fetched data as JSON response
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
