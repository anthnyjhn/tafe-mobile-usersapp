let people = require('../models/data.json');
const { v4: uuidv4 } = require('uuid');

// Get all people
const getPeople = (req, res) => {
    res.json(people);
};

// Get person by ID
const getPersonById = (req, res) => {
    const person = people.find(p => p.id === req.params.id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
};

// Create a new person
const createPerson = (req, res) => {
    const person = { ...req.body, id: uuidv4() };
    people.push(person);
    res.status(201).json(person);
};

// Update person by ID
const updatePerson = (req, res) => {
    const person = people.find(p => p.id === req.params.id);
    if (person) {
        Object.assign(person, req.body);
        res.status(200).json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
};

// Delete person by ID
const deletePerson = (req, res) => {
    const initialLength = people.length;
    people = people.filter(p => p.id !== req.params.id);
    if (people.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
};

module.exports = { getPeople, getPersonById, createPerson, updatePerson, deletePerson };
