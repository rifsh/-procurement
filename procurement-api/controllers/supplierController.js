const Supplier = require('../models/Supplier')

const createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body)
        await supplier.save()
        return res.status(201).json({
            status: 'success',
            message: 'user create SuccessFully',
            data: supplier
        })
    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message

        })
    }
}

const getSupplier = async (req, res) => {
    try {
        const { id } = req.query
        let users = []
        if (id) {
            users = await Supplier.findById(id)
        } else {
            users = await Supplier.find()
        }
        return res.status(200).json({
            status: 'success',
            message: "fetching success fully",
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}

const updateSupllier = async (req, res) => {
    try {
        const { id } = req.params
        const supplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true })
        if (!supplier) {
            return res.status(404).json({
                status: 'faile',
                message: 'Supplier not Found'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'Supplier updated Success',
            data: supplier
        })
    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params
        const supplier = await Supplier.findByIdAndDelete(id)
        if (!supplier) {
            return res.status(404).json({
                status: 'faile',
                message: 'supplier not found'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'user delete successfully',
            data: supplier
        })
    } catch (error) {
        return res.status(500).json({
            status: 'faile',
            message: error.message
        })
    }
}

module.exports = {
    createSupplier,
    getSupplier,
    updateSupllier,
    deleteSupplier
}