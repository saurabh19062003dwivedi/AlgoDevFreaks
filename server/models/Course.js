const mongoose = require("mongoose");
const  courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{type:String,},

    instrucor: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",

        }
    ],
    RatingAndReview:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",

        }
    ],
    price:{
        type:String,
    },
    thumnail:{
        type:String,
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,

    },category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
			ref: "user",
        },
        

    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
});

module.exports = mongoose.model("Course", courseSchema);
