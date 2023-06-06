const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const Order = require('./model/orderSchema');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('the database is connected');
}).catch((err) => {
    if (err) 
        throw err;
    
});

app.get('/', (req, res) => {
    res.send('order is working');
});

app.get('/order', async (req, res) => {
    const order = await Order.find();
    res.send(order);
});

app.post('/order', async (req, res) => {
    var neworder = {
        customerId: req.body.customerId,
        bookId: req.body.bookId,
        initialDate: req.body.initialDate,
        deliverDate: req.body.deliverDate
    };

    console.log('the data is added');

    var order = new Order(neworder);

    order.save().then(() => {
        res.send('the data is saved');
    }).catch((err) => {
        if (err) 
            console.log('the data saving has a problem' + err);
        
    });
});

app.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).maxTimeMS(10000);
        let objectorder={book_id:"",customer_name:""}
        if (order) {
        const response = await axios.get('http://localhost:4000/book/' + order.bookId);  
        objectorder.book_id=response.data.title  
        const response1 = await axios.get('http://localhost:4001/customer/' + order.customerId);
        objectorder.customer_name=response1.data.name
        res.send(objectorder)
            };
        }
       
     catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
    console.log(PORT + '   order is running');
});




