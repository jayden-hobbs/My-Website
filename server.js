const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use(express.static(__dirname));

// Route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for other pages
app.get('/:page', (req, res) => {
    res.sendFile(path.join(__dirname, `${req.params.page}.html`));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 