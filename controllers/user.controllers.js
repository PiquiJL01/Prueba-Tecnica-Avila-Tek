const create = require('./user/create')
const get = require('./user/get')
const getAll = require('./user/getAll')
const update = require('./user/update')
const remove = require('./user/remove')

module.exports = {
    getAll,
    create,
    get,
    update,
    remove
}