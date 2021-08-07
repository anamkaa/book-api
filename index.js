const { response } = require("express");
const express = require("express");
const { request } = require("http");

//database
const database = require("./database");

//initialising express
const booky = express();


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





//localhost
booky.listen(3000, () => {
    console.log("Server is up and running.");
});