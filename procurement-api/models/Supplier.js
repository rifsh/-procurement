const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const supplierSchema = mongoose.Schema({
    supplierNo: { type: Number, unique: true },
    supplierName: { type: String, required: true },
    address: {
        fristLine: { type: String, required: true },
        secountLine: { type: String },
        pinCode: { type: Number, required: true }
    },
    taxNo: { type: Number, required: true },
    country: { type: String },
    mobileNumber: { type: Number, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive", "Blocked"], default: "Active" }

})

supplierSchema.plugin(AutoIncrement, { inc_field: 'supplierNo', start_seq: 1 });

const Supplier = mongoose.model('Supplier', supplierSchema)
module.exports = Supplier 