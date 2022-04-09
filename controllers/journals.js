const Journal = require('../models/journal');

function index(req, res) {
    res.send('This is the journals index function')
};

function allJournals(req, res) {
    res.send('This is the journals allJournals function')
};

function show(req, res) {
    res.send('This is the journals show function')
};

function newJournal(req, res) {
    res.send('This is the journals newJournal function')
};

function create(req, res) {
    res.send('This is the journals create function')
};

function edit(req, res) {
    res.send('This is the journals edit function')
};

function update(req, res) {
    res.send('This is the journals update function')
};

function deleteJournal(req, res) {
    res.send('This is the journals deleteJournal function')
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