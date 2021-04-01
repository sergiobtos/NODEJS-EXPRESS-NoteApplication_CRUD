const knex = require('knex')(require('./knexfile'))

module.exports = {
    getAllNotes(){
        console.log('Getting all notes')
        return knex.select('*').from('notes')
    },

    updateNote({id, title, body}){
        console.log(`Updating note Id: ${id}`)
        return knex('notes').where({ id:id }).update({title: title, body:body})
    },

    getNote({id}){
        console.log(`Getting note Id: ${id}`)
        return knex.select('*').from('notes').where({id:id})
    },

    deleteNote({id}){
        console.log(`Deleting note Id: ${id}`)
        return knex('notes').where({ id:id }).del()
    },

    createNote({title, body}){
        console.log(`Add note ${title} with body: ${body}`)
        return knex('notes').insert({
            title,body
        })
    }
}