const express=require('express')
const app=express()
require('dotenv').config();
const mongoose=require('mongoose')
const PORT=process.env.PORT
const URI=process.env.URI
const Customer=require('./Model/customerschema')


app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
    console.log('Database is running');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});



app.get('/',(req,res)=>{
    res.send("this is port 4001")
})

app.get('/customer',async(req,res)=>{

    const customer=await Customer.find()
    res.json(customer)

})


app.post('/add-customer',async(req,res)=>{
    const newcustomer={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }

    const customer=new Customer(newcustomer)
    customer.save().then(()=>{
        console.log('the data is saved')
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
    
})
app.delete('/customer/:id',async(req,res)=>{
    const customer=await Customer.findOneAndRemove({age:req.params.id})
    res.send('the data is deleted')

})

app.get("/customer/:id",async(req,res)=>{

const customer=await Customer.findById(req.params.id)

if(customer){
res.json(customer)
}
else{
    res.send("not found")
}
})

app.listen(PORT,()=>{
    console.log(PORT+'     CUSTOMER is running')
})



