const mongoose = require("mongoose");
require ("dotenv").config();
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then( () => console.log("DB connected successful"))
    .catch((error) => {
        console.log("DB connectoin failed");
        console.error(error);
        process.exist(1);

    })
};
