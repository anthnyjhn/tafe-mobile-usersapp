const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const peopleRoutes = require('./routes/peopleRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Body parsing
app.use(cors());

// Routes
app.use('/people', peopleRoutes);

// Server start
app.listen(port, () => console.log(`Server running at http://localhost:${port}/people`));
