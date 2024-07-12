import { Router } from "express";
import { signUp,signIn,getAll,getUser,updateUser,deleteUser } from "./users.controller.js";


const userRouter = Router()
userRouter.post('/signUp',signUp)
userRouter.post('/signIn',signIn)
userRouter.get('/getAll',getAll)
userRouter.get('/getUser/:id',getUser)
userRouter.put('/updateUser/:id',updateUser)
userRouter.delete('/deleteUser/:id',deleteUser)
export default userRouter