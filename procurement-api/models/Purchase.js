const mongoose = require('mongoose')
const AuthoIncrement = require('mongoose-sequence')(mongoose)

const purchaseSchema = mongoose.Schema({
    orderNo: { type: Number, requierd: true },
    orderDate: { type: Date, default: Date.now },
    supplierName: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
    itemTotal: { type: Number, requierd: true },
    discount: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    items: [{
        itemNo: { type: Number, ref: "Item", requierd: true },
        stockUnit: { type: String },
        unitPrice: { type: Number },
        orderQty: { type: Number, requierd: true },
        itemAmount: { type: Number },
        discount: { type: Number },
        netAmount: { type: Number }
    }]
})

purchaseSchema.plugin(AuthoIncrement, { inc_field: "orderNo" });

const Purchase = mongoose.model("Purchase", purchaseSchema)
module.exports = Purchase