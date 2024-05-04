const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('main')); // Serve your static files from 'public' directory

app.post('/submit', (req, res) => {
    const { message1, message2 } = req.body;
    const content = `Phone: ${message1}\nAddress: ${message2}\n`;
    
    fs.appendFile('messages.txt', content, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
