// Import the express library
const express = require('express');

// Create an instance of the express application
const app = express();

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Define a basic route for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello from your Express.js server!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open your browser to http://localhost:${PORT}`);
});