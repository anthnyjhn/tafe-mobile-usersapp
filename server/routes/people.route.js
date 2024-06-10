const express = require('express');
const { getPeople, getPersonById, createPerson, updatePerson, deletePerson } = require('../controllers/people.controller');

const router = express.Router();

// Route definitions
router.get('/', getPeople);
router.get('/:id', getPersonById);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;
