const noteDocument = $(document)
const UpdateNote = document.querySelector('./UpdateNote')

UpdateNote.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = UpdateNote.querySelector('.title').value
    const id = UpdateNote.querySelector('.id').value
    const body = UpdateNote.querySelector('.body').value
    put('/notes/'+ { title, body})
    .then(status => {
        window.location = '/'
    })
})

const helpers = {
    loadNote: evt => {
        get('/notes/'+location.search.split("=")[1])
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.length > 0){
                $('#title').val(data[0].title)
                $('#body').val(data[0].body)
                $('#id').val(data[0].id)
            }
        })
    }
}

noteDocument.ready(helpers.loadNote)

function get(path, data){
    return window.fetch(path, {
        method: 'GET'
    })
}

function put(path, data){
    return window.fetch(path, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}