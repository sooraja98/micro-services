const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config();
const PORT = process.env.PORT
const URI = process.env.URI
const Book=require('./model/bookSchema')


// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
    console.log('Database is running');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});


app.get('/', (req, res) => {
    res.send("hai")
})

app.post('/book', (req, res) => {
    var newBook = {
      title: req.body.title,
      author: req.body.author,
      number_of_pages: req.body.number_of_pages,
      publisher: req.body.publisher,
    };
  
    var book = new Book(newBook);
    book.save()
      .then(() => {
        console.log('Successfully added');
        res.send('A new book is added');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error occurred while adding the book');
      });
  });


  app.get('/book',async(req,res)=>{
    const book =await Book.find();
    res.json(book)
  })
  
app.get('/book/:id',async(req,res)=>{
     const book =await Book.findById(req.params.id)
    if (book){
        res.json(book)
    }
    else{
        res.send("the error")
    }
})

app.delete('/book-delete/:id',async(req,res)=>{

    const book=await Book.findOneAndDelete(req.params.id)
    res.send("the the give id book is deleted")

})  
  

app.listen(PORT, () => {
    console.log(PORT+'    BOOK is running')
})
