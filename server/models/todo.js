const mongoose = require('mongoose')

/**
 * Todo document schema
 * @namespace Todo
 * @property {String} name - todo name
 * @property {Number} duration - time required to complete todo item
 * @property {Date} deadline - date and time the item is due
 * @property {Number} minDuration - minimum amount of time in hours for each event
 * @property {Number} maxDuration - maximum amount of time in hours for each event
 * @property {Array} events - Array of Google Calendar IDs that represent events for a ToDo
 */
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    minDuration: {
        type: Number
    },
    maxDuration: {
        type: Number,
        default: 1
    },
    events: [{ type: String, required: true }]
})

module.exports = mongoose.model('ToDo', schema)
