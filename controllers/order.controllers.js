const create = require('./order/create')
const getAll = require('./order/getAll')
const get = require('./order/get')
const updateOrderStatus = require('./order/updateOrderStatus')
const remove = require('./order/remove')

module.exports = {
    create,
    getAll,
    get,
    updateOrderStatus,
    remove
}