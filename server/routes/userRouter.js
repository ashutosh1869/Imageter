import {registerUser,loginUser, createOrder} from '../controllers/userController.js'
import express from 'express'
import userAuth from '../middlewares/auth.js'
import {userCredits} from '../controllers/userController.js'
import {verifyRazorpayPayment} from '../controllers/userController.js'

const userRouter =  express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/pay-razor',userAuth,createOrder)
userRouter.post('/verify-razor',verifyRazorpayPayment)



export default userRouter