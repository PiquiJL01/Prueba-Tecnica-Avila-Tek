const create = require('./order/create')
const getAll = require('./order/getAll')
const get = require('./order/get')
const updateOrderStatus = require('./order/updateOrderStatus')
const cancel = require('./order/cancel')

module.exports = {
    create,
    getAll,
    get,
    updateOrderStatus,
    cancel: cancel
}