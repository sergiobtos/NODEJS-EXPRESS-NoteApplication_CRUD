const store = require('../store')

module.exports = function(app, db){
    app.get('/all/notes', (req, res, next) =>{
        //get all notes and return the values as json
        store.getAllNotes()
        .then((result)=> res.json(result))
    })
    //get note by Id
    app.get('/notes/:id', (req, res, next) =>{
        store.getNote({
            id: req.params.id,
        })
        .then((result)=> res.json(result))
    })

    //delete note by Id
    app.delete('/notes/:id', (req, res, next) =>{
        store.deleteNote({
            id: req.params.id,
        })
        .then((result)=> res.sendStatus(200))
    })

    //Update a note using Id inside of url
    app.put('/notes/:id', (req, res, next) =>{
        store.updateNote({
            id: req.params.id,
            title: req.body.title,
            body: req.body.body,
        })
        .then((result)=> res.sendStatus(200))
    })

    app.post('/notes', (req, res, next) =>{
        console.log(req.body)
        store.createNote({
            title: req.body.title,
            body: req.body.body
        })
        .then((result)=> res.sendStatus(200))
    })
}