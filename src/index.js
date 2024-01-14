const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = phonebook.find((value) => id === value.id)
    if (entry) {
        response.json(entry)
    } else {
        response.status(404).send(`Entry not found for id ${id}`)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    let found = false
    phonebook = phonebook.filter((entry) => {
        if (id === entry.id) {
            found = true
            return false
        } else {
            return true
        }
    })
    if (found) {
        response.status(204).end()
    } else {
        response.status(404).send(`Entry not found for id ${id}`)
    }
})

app.post('/api/persons', (request, response) => {
    const newEntry = request.body
    while (true) { // this must be inefficient, oh well, we should use a hash table instead
        const id = Math.floor(Math.random() * 1000000)
        if (!phonebook.find((entry) => entry.id === id)) {
            phonebook.push({id: id, name: newEntry.name, number: newEntry.number})
            break
        }
    }
    response.json(newEntry)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Phonebook server running on ${PORT}`)
})