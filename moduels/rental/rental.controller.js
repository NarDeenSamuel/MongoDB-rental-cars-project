import { ObjectId } from "bson"
import userModel from "../users/users.controller.js"
import carModel from "../cars/cars.controller.js"
import { db } from "../../db/dbConnection.js"
const rentalModel = db.collection('rentals')
export default rentalModel
const addRental = async (req,res)=>{
const {userId,carId,rentalDate,returnDate} = req.body
const isUser = await userModel.findOne({_id:new ObjectId(userId)})
if(!isUser) return res.status(400).json({message:"user not found"})

    const isCar = await carModel.findOne({_id:new ObjectId(carId)})
    if(!isCar) return res.status(400).json({message:"car not found"})

if (isCar.rentalStatus != "available") return res.status(400).json({message:"car is not available"})

await carModel.updateOne({_id:new ObjectId(carId)}, { $set : {rentalStatus:"rented"} });

await rentalModel.insertOne({userId:new ObjectId(userId),carId:new ObjectId(carId),rentalDate:new Date(rentalDate),returnDate:new Date(returnDate)})


return res.status(201).json({message:"Done"})

}

const getAll = async (req,res)=>{
    const rentals = await rentalModel.find().toArray()

return rentals.length? res.status(200).json({message:"Done",rentals}) : res.status(400).json({message:"no rentals found"})

}
const getRental = async (req,res)=>{
    const rental = await rentalModel.findOne({_id:new ObjectId(req.params.id)})
    return rental ? res.status(200).json({message:"Done",rental}) : res.status(400).json({message:"no rentals found"})
    

}


const updateRental = async (req,res)=>{
    const id = req.params.id
    const {returnDate} = req.body

    const {matchedCount} = await rentalModel.updateOne({_id:new ObjectId(id)},{$set : {returnDate:new Date(returnDate)}})

    return matchedCount ? res.status(200).json({message:"updated"}) : res.status(400).json({message:"invalid id"})

}


const deleteRental = async (req,res)=>{

    const id = req.params.id

    const {deletedCount} = await rentalModel.deleteOne({_id:new ObjectId(id)})
    if(!deletedCount) return res.status(400).json({message:"rental not found"})
        return res.status(201).json({message:"deleted"})



}



export {
    addRental,getAll,getRental,updateRental,deleteRental
}