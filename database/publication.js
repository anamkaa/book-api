const mongoose = require("mongoose");

//publication schema

const PublicationSchema = mongoose.Schema(
    {
        id: String,
        name: String,
        books:[String]
    }
);

const PublicationModel = mongoose.model("publication",PublicationSchema);

module.exports = PublicationModel;