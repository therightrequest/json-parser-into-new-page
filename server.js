const express = require('express');
const path = require('path');
const app = express();

// Increase the body size limit
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

// Route to serve script.js
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'script.js'));
});

// Route to serve styles.css
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'styles.css'));
});

app.use(express.json());

app.post('/parse-json', (req, res) => {
    const { jsonString } = req.body;

    try {
        const parsedJson = JSON.parse(jsonString);
        res.json(parsedJson); // Send back the parsed JSON directly
    } catch (error) {
        res.status(400).json({
            error: 'Invalid JSON: ' + error.message
        });
    }
});

// Export the app for use in Vercel
module.exports = app;
