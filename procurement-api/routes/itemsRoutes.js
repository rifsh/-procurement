const express = require('express')
const { createItem, getItem, updatedItem, deleteItem } = require('../controllers/itemsController')
const authenticate = require('../middleware/authenticate')
const router = express.Router()

router.post('/', authenticate, createItem)
    .get('/', getItem)
    .put('/:id', authenticate, updatedItem)
    .delete('/:id', authenticate, deleteItem)
module.exports = router