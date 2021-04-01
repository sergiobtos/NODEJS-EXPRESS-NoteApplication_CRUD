//Bridge between API and Front End
const noteDocument = $(document)
const CreateNote = document.querySelector('.CreateNote')

//Make post request and add note to database
CreateNote.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = CreateNote.querySelector('.title').value
    const body = CreateNote.querySelector('.body').value
    post('/notes', {title, body})
    .then(status => {
        helpers.loadNotes()
        alert('Note successfully added')
    })
})

const helpers = {
    loadNotes: evt => {
        get('/all/notes')
        .then(response => response.json())
        .then(data => {
            $('#body_data').empty()
            $('.title').empty()
            $('.body').empty()
            for(var i = 0; i < data.length; i++){
                $('#body_data').append($('<tr>')
                .append($('<td>')
                .text(data[i].id)
                )
                .append($('<td>')
                .text(data[i].title)
                )
                .append($('<td>')
                .text(data[i].body)
                )
                .append($('<td>')
                    .append($('<button>')
                    .attr('class', 'btn-danger btn')
                    .attr('onclick', 'deleteItem('+data[i].id+')')
                    .attr('id', data[i].id) 
                    .text('Delete')
                ))
                .append($('<td>')
                    .append($('<a>')
                    .attr('href', '/details/?id='+data[i].id)
                    .attr('class', 'btn btn-warning')
                    .text('Update')
                )))
            }
        })
    }
}

noteDocument.ready(helpers.loadNotes)

function deleteItem(item_id){
    deleteMethod('/notes/'+item_id, {})
    .then(status => {
        helpers.loadNotes()
        alert('Note successfully delete')
    })
}

function get(path, data){
    return window.fetch(path, {
        method:'GET',
    })
}
    
    function post(path, data){
        return window.fetch(path, {
          method:'POST',
          headers: {
             'Accept':'application/json',
             'Content-Type':'application/json' 
          },
          body: JSON.stringify(data) 
        })
    }

function deleteMethod(path, data){
    return window.fetch(path, {
       method:'DELETE',
       headers:{
       'Accept':'application/json',
       'Content-Type':'application/json'
       },
       body: JSON.stringify(data)
    })
}