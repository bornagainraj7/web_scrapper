const express = require('express');
const app = express();
const scrapper = require('./utils/scrapper');

app.get('/', (req, res) => {
    console.log('home page');
    res.send('home page');
});

app.get('/search/:title', (req, res) => {
    scrapper.searchRepo(req.params.title)
    .then((repos) => {
        res.json(repos);
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})