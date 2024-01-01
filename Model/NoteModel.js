const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: [3,"Title must be more than 3 letter"], maxlength: [30, "Title cannot be more than 30 letter"]},
    content: {type: String, required: true,minlength: [10,"Content must be more than 3 letter"], maxlength: [50, "Content cannot be more than 30 letter"]},
    time: {type: Date, default: Date.now},
},{
    collection: 'NoteData'
})

const NoteModel = mongoose.model('NoteData',NoteSchema)

module.exports = NoteModel