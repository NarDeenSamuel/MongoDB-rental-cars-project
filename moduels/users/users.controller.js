import { ObjectId } from "bson"
import { db } from "../../db/dbConnection.js"
import bcrypt from 'bcrypt'
const userModel = db.collection('users')
export default userModel
// db.collection('users').insertOne({name:"ahmed"})

const signUp = async (req,res)=>{
    const {name,email,password,phone} = req.body
    const isEmail = await userModel.findOne({email})
if(isEmail) return res.status(400).json({message:"Email is already exist"})
const hashPassword = bcrypt.hashSync(password,8)
await userModel.insertOne({
    name,email,password:hashPassword,phone
})
return res.status(201).json({message:"Added"})

}

const signIn = async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    console.log(user)
    if(!user || !bcrypt.compareSync(password,user.password))     return res.status(400).json({message:"invalid info"})
    
        return res.status(200).json({message:"logIN"})

}

const getAll = async (req,res)=>{
    const users = await userModel.find().toArray()

return users.length? res.status(200).json({message:"Done",users}) : res.status(400).json({message:"no users found"})
}

const getUser = async (req,res)=>{
const user = await userModel.findOne({_id:new ObjectId(req.params.id)})
return user ? res.status(200).json({message:"Done",user}) : res.status(400).json({message:"no users found"})

}

const updateUser = async (req,res)=>{

 const {name,phone,userId} = req.body
//  console.log(req.params.id,"    ",userId)
if (req.params.id != userId) return res.status(400).json({message:"you are not the owner"})

    const {matchedCount} =await userModel.updateOne({_id:new ObjectId(req.params.id)},{$set:{name,phone}})

    if(!matchedCount) return res.status(400).json({message:"user not found"})
        return res.status(201).json({message:"Updated"})


}

const deleteUser = async (req,res)=>{
    const {id} = req.body
    if (req.params.id != id) return res.status(400).json({message:"you are not the owner"})
const {deletedCount} = await userModel.deleteOne({_id:new ObjectId(id)})
    if(!deletedCount) return res.status(400).json({message:"user not found"})
        return res.status(201).json({message:"deleted"})
}

export{
    signUp,signIn,getAll,getUser,updateUser,deleteUser
}

