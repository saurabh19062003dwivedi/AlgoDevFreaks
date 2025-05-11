const mongoose = require("mongoose");
const courseProgress = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    completeVedios:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subsecion",
        }
    ],
});

module.exports = mongoose.model("courseProgress", courseProgress);

