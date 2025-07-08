import express from 'express'
import {registerUser, loginUser, userCredits} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter=express.Router()
// post for sending the data from website to backend
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/credits',userAuth, userCredits)

export default userRouter