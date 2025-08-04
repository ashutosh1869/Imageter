import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import razorpay from "razorpay";
import TransactionModel from "../models/transactionMode.js";

dotenv.config();

export const registerUser = async (req, res) => {
  try{
    const {name,email,password} =req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"please fill all the fields"})
    }
     const existingUser = await userModel.findOne({ email });
      if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
      }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const userData={
        name,
        email,
        password:hashedPassword
    };
    const newUser = new userModel(userData);
    if (!newUser) {
      return res.status(400).json({ success: false, message: "User registration failed " });
    }
    const user =await newUser.save();
    console.log(user);
    const token =jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    )
    return res.json({success:true,message:"User registered successfully",token,user:{ name:user.name}});
}
catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const loginUser = async(req,res)=>{
  try {
    const {email,password}= req.body;
    if(!email || !password){
      return res.json({success:false,message:"please fill all the details."})
    }
    const user = await userModel.findOne({email})
    if(!user)
      return res.json({success:false,message:"No user found."})
    const isMatch = await bcrypt.compare(password,user.password);
    if(isMatch){
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
      return res.json({success:true,token,message:"logged in successfully",
        user:{ name:user.name, email:user.email, creditBalance:user.creditBalance }
      })
    }else{
      return res.json({success:false,message:"Invalid Password"})
    }

  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
export const createOrder = async (req, res) => {
  try {
   const {userId,planId} = req.body;
   const userData = await userModel.findById(userId);
    if(!userId || !planId){
      return res.json({success:false,message:"Missing details"})
    }
    let credits,plan,amount,date;
    switch (planId) {
      case 'Basic':
        credits = 50;
        plan = 'Basic';
        amount = 5000; // 50 INR
        break;
      case 'Advanced':
        credits = 100;
        plan = 'Advanced';
        amount = 10000; // 100 INR
        break;
      case 'Business':
        credits = 200;
        plan = 'Business';
        amount = 20000; // 200 INR
        break;
      default:
        return res.json({ success: false, message: "Invalid plan" });
    }
    date=Date.now();
    const transaction = {
      userId,
      plan,
      credits,
      amount,
      date
    };
    const newTransaction = await TransactionModel.create(transaction);
    const options = {
      amount: amount, // amount in the smallest currency unit
      currency: process.env.CURRENCY,
      receipt: `receipt_${newTransaction._id}`,
      notes: {
        userId: userId,
        planId: planId,
        transactionId: newTransaction._id
      }
    };
    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error("Error creating Razorpay order:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const verifyRazorpayPayment = async (req, res) => {
  try {
    console.log("🔍 Incoming payment verification request:", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // 1. Check all values are present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay payment details" });
    }

    // 2. Signature verification
    const crypto = await import('crypto');
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // 3. Fetch transaction using receipt in order
    const order = await razorpayInstance.orders.fetch(razorpay_order_id);
    const transactionId = order.notes?.transactionId;

    if (!transactionId) {
      return res.status(400).json({ success: false, message: "Transaction ID not found in order notes" });
    }

    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    if (transaction.payment) {
      return res.status(400).json({ success: false, message: "Payment already verified" });
    }

    // 4. Update user credits
    const user = await userModel.findById(transaction.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.creditBalance = (user.creditBalance || 0) + transaction.credits;
    await user.save();

    transaction.payment = true;
    await transaction.save();

    return res.json({
      success: true,
      message: "Payment verified successfully",
      credits: user.creditBalance,
    });

  } catch (error) {
    console.error("🔥 Error in verifyRazorpayPayment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const userCredits = async (req,res)=>{
  try {
    const {userId}=req.body
    const user = await userModel.findById(userId)
    return res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
  } catch (error) {
     console.error("Error credits in user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

 
    