import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import FormData from "form-data";
import axios from "axios";

dotenv.config();
export const generateImage = async (req,res)=>{
    try {
        const { prompt, userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }
        if(user.creditBalance===0){
            return res.json({success:false,message:"Insufficient credits.",credit:user.creditBalance});
        }

       const formData = new FormData();
       formData.append("prompt", prompt);
       const {data}=await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
           headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY
           },
              responseType: 'arraybuffer'
       });

       const base64Image = Buffer.from(data, 'binary').toString('base64');
       const imageUrl = `data:image/png;base64,${base64Image}`;
       await userModel.findByIdAndUpdate(userId, {
           $inc: { creditBalance: -1 }
       });

       return res.json({ success: true, message: "Image generated successfully", imageUrl , credit: user.creditBalance - 1 });
    } catch (error) {
        console.error("Error generating image:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}