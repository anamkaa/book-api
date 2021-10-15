const mongoose = require("mongoose");

//author schema

const AuthorSchema = mongoose.Schema (
    {
        id: String,
        name: String,
        books:[String]
    }
);

const AuthorModel = mongoose.model("author",AuthorSchema);

module.exports = AuthorModel; 