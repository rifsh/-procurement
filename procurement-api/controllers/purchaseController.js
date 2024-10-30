const Purchase=require('../models/Purchase')

const createPurchase=async(req,res)=>{
    try {
        const purchase=await Purchase.create(req.body)
        purchase.save()
        return res.status(201).json({
            status:'success',
            message:'purchase create successFully',
            data:purchase
        })
    } catch (error) {
        return res.status(500).json({
            status:'faile',
            message:error.message
        })
    }
}

const getPurchase=async(req,res)=>{
    try {
        const {id}=req.query
        let purchase=[]
        if(!purchase){
            purchase =await Purchase.findById(id)
        }else{
            purchase=await Purchase.find().populate("supplierName")
        }
        console.log(purchase,'purchase')
        return res.status(200).json({
            status:'success',
            message:'purchase find successfully',
            data:purchase
        })
    } catch (error) {
        return res.status(500).json({
            status:'faile',
            message:error.message
        })
    }
}


const updatePurchase=async(req,res)=>{
    try {
        const {id}=req.params
        const purchase=await Purchase.findByIdAndUpdate(id,req.body,{new:true})
        if(!purchase){
            return res.status(404).json({
                status:'faile',
                message:'purchase not found'
            })
        }
        return res.status(200).json({
            status:'success',
            message:'purchase fetching successfully',
            data:purchase
        })
    } catch (error) {
        return res.status(500).json({
            status:'faile',
            message:error.message
        })
    }
}


const deletePurchase=async(req,res)=>{
    try {
        const {id}=req.params
        const purchase=await Purchase.findByIdAndDelete(id)
        if(!purchase){
            return res.status(404).json({
                status:'faile',
                message:'purchase Not Fond'
            })
        }
        return res.status(200).json({
            status:'success',
            message:"purchase delete success fully",
            data:purchase
        })
    } catch (error) {
        return res.status(500).json({
            status:'faile',
            message:error.message
        })
    }
}

module.exports={
    createPurchase,
    getPurchase,
    updatePurchase,
    deletePurchase
}