const Item = require('../models/Item')

const createItem = async (req, res) => {
    console.log(req);

    try {
        const item = await Item.create(req.body)
        item.save()
        return res.status(201).json({
            status: 'success',
            message: 'Item Created',
            data: item
        })
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}
const getItem = async (req, res) => {
    try {
        const { id } = req.query
        let item
        if (id) {
            item = await Item.findById(id)
            if (!item) {
                return res.status(404).json({
                    status: 'faile',
                    message: 'item not found'
                })
            }
        } else {
            item = await Item.find()
        }
        return res.status(200).json({
            status: "success",
            message: 'success fully fetch data',
            data: item
        })

    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}

const updatedItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findByIdAndUpdate(id, req.body, { new: true })
        if (!item) {
            return res.status(404).json({
                status: 'faile',
                message: 'item not found'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'item Updated suceessFully',
            data: item
        })
    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findByIdAndDelete(id)
        if (!item) {
            return res.status(404).json({
                status: 'faile',
                message: 'item not font'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'item delete successfully',
            data: item
        })
    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}

module.exports = { createItem, getItem, updatedItem, deleteItem }