const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('web'));

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
