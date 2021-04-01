const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(express.static('public'));
app.use(bodyParser.json());

require('./routes/note-router')(app, {})

app.get('/details', function(req, res){
    res.sendFile(path.join(__dirname+'/public/details.html'))
})

app.listen(3000, ()=> {
    console.log('Server is running on http://localhost:3000')
})