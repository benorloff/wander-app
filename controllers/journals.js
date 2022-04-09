const Journal = require('../models/journal');

function index(req, res) {
    res.send('This is the movies index function')
};

function allJournals(req, res) {
    res.send('This is the movies index function')
};

function show(req, res) {
    res.send('This is the movies index function')
};

function newJournal(req, res) {
    res.send('This is the movies index function')
};

function create(req, res) {
    res.send('This is the movies index function')
};

function edit(req, res) {
    res.send('This is the movies index function')
};

function update(req, res) {
    res.send('This is the movies index function')
};

function deleteJournal(req, res) {
    res.send('This is the movies index function')
};

module.exports = {
    index,
    allJournals,
    show,
    new: newJournal,
    create,
    edit,
    update,
    delete: deleteJournal
}