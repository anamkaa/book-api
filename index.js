require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");


//database
const database = require("./database/database");
// const { request, response } = require("express");

//model
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
const { response, request } = require("express");


//initialising express
const booky = express();

//body parser
booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true  
}
).then(()=> console.log("Connection Established")); 


// book section starts

/*
/route         /
/desciption    to get all the books
/access        public
/parameter     none
/method        get
*/

booky.get("/",async (request,response)=>{
    const getAllBooks = await BookModel.find();
    return response.json(getAllBooks);
});

/*
/route         /is
/desciption    to get all the books by isbn
/access        public
/parameter     isbn
/method        get
*/

booky.get("/is/:isbn",async (request,response)=>{
    
    const getSpecificBook = await BookModel.findOne({ISBN: request.params.isbn});

    if(!getSpecificBook){
        return response.json({error:`No book found for the ISBN of ${request.params.isbn}`});
    }
    return response.json({book:getSpecificBook});
});

/*
/route         /c
/desciption    to get all the books by category
/access        public
/parameter     category
/method        get
*/

booky.get("/c/:category",async (request,response)=>{

    const getSpecificBook = await BookModel.findOne({category: request.params.category});
   
    if(!getSpecificBook){
        return response.json({error:`No book found for the category of ${request.params.category}`});
    }
    return response.json({book:getSpecificBook});
});

/*
/route         /c
/desciption    to get all the books by category
/access        public
/parameter     category
/method        get
*/

booky.get("/lan/:language",async (request,response)=>{

    const getSpecificBook = await BookModel.findOne({language: request.params.language});
   
    if(!getSpecificBook){
        return response.json({error:`No book found for the category of ${request.params.language}`});
    }
    return response.json({book:getSpecificBook});
})

//book section ends



//author section starts

/*
/route         /author
/desciption    to get all the books by author
/access        public
/parameter     none
/method        get
*/

booky.get("/author", async (request,response)=>{
    const getAllAuthors = await AuthorModel.find();
    return response.json(getAllAuthors);
});


/*
/route         /author
/desciption    to get specific author by id
/access        public
/parameter     id
/method        get
*/

booky.get("/author/:id", async(request,response)=>{

    const getSpecificAuthor = await AuthorModel.findOne({id: request.params.id});
    // const getSpecificAuthor = database.author.filter((author)=>author.id===request.params.id);
    if(!getSpecificAuthor){
        return response.json({error:`No author found for the category based on ${request.params.id}`});
    }
    return response.json({authors:getSpecificAuthor});
});


/*
/route         /author/book
/desciption    to get specific author by book
/access        public
/parameter     isbn
/method        get
*/

booky.get("/author/book/:isbn", (request,response)=>{

    const getSpecificAuthor = database.author.filter((author)=>author.books.includes(request.params.isbn));
    if(getSpecificAuthor.length===0){
        return response.json({error:`No book found for category besed on ${request.params.isbn}`});
    }
    return response.json({authors:getSpecificAuthor});
})

// author section ends



// publication section starts

/*
/route         /publication
/desciption    to get all publications
/access        public
/parameter     none
/method        get
*/

booky.get("/publication",async (request,response)=>{
    const getAllPublications = await PublicationModel.find();
    return response.json(getAllPublications);
})


/*
/route         /publication
/desciption    to get a specific publication
/access        public
/parameter     id
/method        get
*/

booky.get("/publication/:id",async(request,response)=>{
    
    const getSpecificPublication = await PublicationModel.findOne({id:request.params.id});
    // const getSpecificPublication = database.publication.filter((publication)=>publication.id===request.params.id);
    if(!getSpecificPublication){
        return response.json({error:`No book found for category of ${request.params.id}`});
    }
    return response.json({publications:getSpecificPublication});
});


/*
/route         /publication/book
/desciption    to get a publication by book
/access        public
/parameter     isbn
/method        get
*/

booky.get("/publication/book/:isbn",(request,response)=>{
    const getSpecificPublication = database.publication.filter((publication)=>publication.books.includes(request.params.isbn));
    if(getSpecificPublication.length===0){
        return response.json({error:`No book found for category of ${request.params.isbn}`});
    }
    return response.json({publications:getSpecificPublication});
})

// publication section ends

//post method

//adding new book

/*
/route         /book/new
/desciption    to add a new book
/access        public
/parameter     none
/method        post
*/

booky.post("/book/new",async (request,response)=>{

    const {newBook} = request.body;
    const addNewBook = BookModel.create(newBook);
    return response.json(
        {
            books: addNewBook,
            message: "Book was added"
        }
    );

    
});

//adding new author

/*
/route         /author/new
/desciption    to add a new author
/access        public
/parameter     none
/method        post
*/

booky.post("/author/new",async(request,response)=>{

    const {newAuthor} = request.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return response.json({
        author: addNewAuthor,
        message: "Author was added"
    });
    
});

//adding new publication

/*
/route         /author/new
/desciption    to add a new author
/access        public
/parameter     none
/method        post
*/

booky.post("/publication/new", async(request,response)=>{

    const {newPublication} = request.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return response.json({
        author: addNewPublication,
        message : " Publication was added"
    });
    // const newPublication = request.body;
    // database.publication.push(newPublication);
    // return response.json({updatedPublications:database.publication});
});

//post method ends

//put method starts

//update book
booky.put("/book/update/:isbn", async(request,response)=>{
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: request.params.isbn
        },
        {
            title: request.body.bookTitle
        },
        {
            new: true
        }
    );

    return response.json(
        {
            books:updatedBook
        }
    );
});

//updating book and author
booky.put("/book/author/update/:isbn",async(request,response)=>{

    //updating book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: request.params.isbn
        },
        {
            $addToSet:{
                authors: request.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    //updating author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: request.body.newAuthor
        },
        {
            $addToSet: {
                books: request.params.isbn
            }
        },
        {
            new: true
        }
    );

    return response.json({
        books: updatedAuthor,
        authors: updatedAuthor,
        message:"New author was added"
    });
});




booky.put("/publication/update/book/:isbn",(request,response)=>{
    //updating publication database
    database.publication.forEach((pub)=>{
        if(pub.id===request.body.pubId){
            return pub.books.push(require.params.isbn);
        }
    });

    //updating book database
    database.books.forEach((book)=>{if(book.ISBN===request.params.isbn){
        book.publications = request.body.pubId;
        return;
    }
        
    });

    return response.json({books:database.books,publications:database.publication,message:"Successfully updated publication"});
});

//delete

booky.delete("/book/delete/:isbn",async(request,response)=>{

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: request.params.isbn
        }
    );

    return response.json({
        books: updatedBookDatabase
    });
    // const updatedBookDatabase = database.books.filter((book)=>book.ISBN!==request.params.isbn);
    // database.books = updatedBookDatabase;
    // return response.json({books:database.books});
});

//delete author from book and related book from author

booky.delete("/book/delete/author/:isbn/:authorId",(request,response)=>{
    //update the book database
    database.books.forEach((book)=>{
        if((book.ISBN)===request.params.isbn){
            const newAuthorList = book.author.filter((eachAuthor)=>eachAuthor!==parseInt(request.params.authorId));
            book.author = newAuthorList;
            return;
        }
    });

    //update author database
    database.author.forEach((eachAuthor)=>{
        if(eachAuthor.id===parseInt(request.params.authorId)){
            const newBookList = eachAuthor.books.filter((book)=>bokk!==request.params.isbn);
            eachAuthor.books =newBookList;
            return;
        }
    });

    return response.json({book:database.books, authors:database.author, message:"Deleted" });
});



//localhost
booky.listen(3000, () => {
    console.log("Server is up and running.");
});