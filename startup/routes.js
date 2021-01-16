const express = require ('express');
const genres = require ('../routes/genres');
const customers = require ('../routes/customers');
const movies = require ('../routes/movies');
const rentals = require ('../routes/rentals');
const users = require ('../routes/users')
const auth = require('../middleware/auth');
const error = require('../middleware/error')

module.exports = function (app) {
app.use(express.json()); //Parses the body of a req to a JSON Obj
app.use('/api/genres', genres); //Any route which starts with "path" should be handled with courses route.
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users);
app.use('/api/auth', auth);
app.use(error);
}