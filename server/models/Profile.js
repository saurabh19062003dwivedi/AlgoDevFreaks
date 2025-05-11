const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    gender:{
        type:String,

    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true,

    },
    connectNumber:{
        type:Number,
        trim:true,
    },
    profileimage: { type: String },
});

module.exports = mongoose.model("Profile", ProfileSchema);
