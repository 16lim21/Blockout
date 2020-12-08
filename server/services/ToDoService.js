/**
 * Service to interact with todo database
 * @module services/ToDoService
 */
const ToDo = require('../models/todo')
const UserService = require('./UserService')

/**
 * Gets all users from mongodb database
 * @returns {Document} - Returns all user documents
 */
function findAllItems () {
    return ToDo.find({})
}

/**
 * Get specific document
 * @param {string} id - ID string
 * @returns {document} - returns document by ID field
 */
function getItem (id) {
    return ToDo.findById({ _id: id })
}

/**
 * Post new item
 * @function
 * @param {Object} body - object representing todo item
 * @param {String} userid - id for user that created the todo item
 * @returns {Promise} – Promise to return document in mongoDB database
 */
async function postItem (body, userid) {
    if (!userid) throw Error('missing user id')

    const todo = new ToDo(body)

    const user = await UserService.pushItem(userid, 'todos', todo.id)
    if (user instanceof Error) throw user

    return todo
        .save((err, todo) => {
            if (err) return Error(err)
        })
        .catch((error) => console.log(error))
}

function patchItem (id, body, flags) {
    return ToDo.findByIdAndUpdate({ _id: id }, body, flags)
}

/**
 * Delete specific item and from user todo array
 * @param {string} id - ID representing todo object
 */
function deleteItem (id, userid) {
    return ToDo.deleteOne({ _id: id }, (err) => {
        if (err) throw err
        UserService.deleteItem(userid, 'todos', id)
    })
}

/**
 * Delete specific todo (mainly for testing purposes)
 * @param {string} id - ID representing todo object
 */
function deleteToDo (id) {
    return ToDo.deleteOne({ _id: id }, (err) => {
        if (err) throw err
    })
}

module.exports = {
    findAllItems,
    getItem,
    postItem,
    patchItem,
    deleteItem,
    deleteToDo
}
