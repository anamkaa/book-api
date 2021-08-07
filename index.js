const { response } = require("express");
const express = require("express");
const { request } = require("http");

//database
const database = require("./database");

//initialising express
const booky = express();


// book section starts

/*
/route         /
/desciption    to get all the books
/access        public
/parameter     none
/method        get
*/

booky.get("/",(request,response)=>{
    return response.json({books:database.books});
});

/*
/route         /is
/desciption    to get all the books by isbn
/access        public
/parameter     isbn
/method        get
*/

booky.get("/is/:isbn",(request,response)=>{
    const getSpecificBook = database.books.filter((book)=>book.ISBN===request.params.isbn);
    if(getSpecificBook.length===0){
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

booky.get("/c/:category",(request,response)=>{
    const getSpecificBook = database.books.filter((book)=>book.category.includes(request.params.category));
    if(getSpecificBook.length===0){
        return response.json({error:`No book found for the category of ${request.params.category}`});
    }
    return response.json({book:getSpecificBook});
})

/*
/route         /c
/desciption    to get all the books by category
/access        public
/parameter     category
/method        get
*/

booky.get("/lan/:language",(request,response)=>{
    const getSpecificBook = database.books.filter((book)=>book.language.includes(request.params.language));
    if(getSpecificBook.length===0){
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

booky.get("/author",(request,response)=>{
    return response.json({authors:database.author});
});


/*
/route         /author
/desciption    to get specific author by id
/access        public
/parameter     id
/method        get
*/

booky.get("/author/:id",(request,response)=>{
    const getSpecificAuthor = database.author.filter((author)=>author.id===request.params.id);
    if(getSpecificAuthor.length===0){
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

booky.get("/author/book/:isbn",(request,response)=>{
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

booky.get("/publication",(request,response)=>{
    return response.json({publications:database.publication});
})


/*
/route         /publication
/desciption    to get a specific publication
/access        public
/parameter     id
/method        get
*/

booky.get("/publication/:id",(request,response)=>{
    const getSpecificPublication = database.publication.filter((publication)=>publication.id===request.params.id);
    if(getSpecificPublication.length===0){
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


//localhost
booky.listen(3000, () => {
    console.log("Server is up and running.");
});