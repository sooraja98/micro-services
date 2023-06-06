const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({

    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    initialDate:{
        type:Date,
        required:true
    },
    deliverDate:{
        type:Date,
        required:true
    }
})



const Order=mongoose.model('order',orderSchema)

module.exports=Order