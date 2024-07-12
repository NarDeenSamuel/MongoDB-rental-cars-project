import { db } from "../../db/dbConnection.js"
import { ObjectId } from "bson"
const carModel = db.collection("cars")
export default carModel

const addCar = async (req,res)=>{

    const {name,model} = req.body
    await carModel.insertOne({name,model,rentalStatus:"available"})
    res.status(201).json({message:"Added"})
}

const getAll = async (req,res)=>{
    const cars = await carModel.find().toArray()

return cars.length? res.status(200).json({message:"Done",cars}) : res.status(400).json({message:"no cars found"})

}
const getCar = async (req,res)=>{
    const car = await carModel.findOne({_id:new ObjectId(req.params.id)})
    return car ? res.status(200).json({message:"Done",car}) : res.status(400).json({message:"no cars found"})
    

}
const updateCar = async (req,res)=>{
    const id = req.params.id
    const {name} = req.body
    const {matchedCount} = await carModel.updateOne({_id:new ObjectId(id)},{$set:{name}})

    return matchedCount? res.status(200).json({message:"Updated"}) : res.status(400).json({message:"car not found"})


}
const deleteCar = async (req,res)=>{
    const id = req.params.id

    const {deletedCount} = await carModel.deleteOne({_id:new ObjectId(id)})
    if(!deletedCount) return res.status(400).json({message:"car not found"})
        return res.status(201).json({message:"deleted"})


}


export{
    addCar,getAll,getCar,updateCar,deleteCar
}