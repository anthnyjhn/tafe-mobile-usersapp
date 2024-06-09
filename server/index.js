let people = require('./data.json');

const express = require('express'); 
const bodyParser = require('body-parser'); 
var cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get('/people',(request, response) => {
    
    response.json(people);
});

app.get('/people/:id',(request, response) => {
    let person = people.find(p=>p.id == request.params.id); 
    if(person){
        response.json(person); 
    }
    else{
        response.status(404).send(); 
    }
});

app.post('/people',(request, response) => {
    let person = request.body; 
    person.id = uuidv4(); 
    people.push(person); 
    response.status(201).json(person); 
});

app.put('/people/:id',(request, response) => {
    let person = people.find(p=>p.id == request.params.id); 
    if(person){
       person.name = request.body.name;
       person.age = request.body.age; 
       response.status(200).json(person);  
    }
    else{
        response.status(404).send(); 
    }
});

app.delete('/people/:id',(request, response) => {
    people = people.filter(p=>p.id != request.params.id); 
    
    console.log('deleted',request.params.id);
    response.status(204).send();  
});

app.listen(port, () => console.log(`http://localhost:${port}/people`));