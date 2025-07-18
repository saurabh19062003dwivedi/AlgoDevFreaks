const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
    try{
        const email = req.body.email;
        const user =  await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:`this email: ${email} is not registered with us enter a valid email`,
            });
        }
        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails = await User.findOneUpdated(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now() + 3600000,
            },
            {new:true}
        );
        console.log("details", updatedDetails);

        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(
            email, 
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`,
        );
        res.json({
            success:true,
            message:"email sent successsfully, please check your email to constinue futher",
        });

    }
    catch(error){
 
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
    }
};


exports.resetPassword = async (req, res)=> {
    try{

        const {password, confirmPassword, token} = req.body;

        if(confirmPassword !== password){
           return res.json({ success:false,
            message:'password and confirm password does not match ',
        });
        }
        const userDetails = await User.findOne({token:token});
        if(!userDetails){
            return res.json({
                success:false,
                message:"token is invalid",
            });
        }

        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
    }catch(error){
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
    }
};

