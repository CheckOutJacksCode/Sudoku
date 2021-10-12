const express = require('express');
const app = express();
module.exports = app;

app.get('/', function (req, res) {
    res.send('hello world')
});


const PORT = 3000;

app.listen(3000, () => {
    console.log(`Server running on ${PORT}`);
})