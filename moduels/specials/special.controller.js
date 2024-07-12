
import userModel from "../users/users.controller.js"
import carModel from "../cars/cars.controller.js"




const getHondaToyota = async (req,res)=>{

const cars = await carModel.find(({model:{$in:['Honda','Toyota']}})).toArray()

return cars.length? res.status(200).json({message:"Done",cars}) : res.status(400).json({message:"no car founds"})

}
const getAvailableCars = async (req,res)=>{
    const {model} = req.body
    const cars = await carModel.find({model:model,rentalStatus:"available"}).toArray()
    
    return cars.length? res.status(200).json({message:"Done",cars}) : res.status(400).json({message:"no car founds"})
    
}
   

const rentedOrSpccific = async (req,res)=>{
    const {model} = req.body


const condition = {} ;
if (model)
    {
        condition.model=model
    }
    else{
        condition.rentalStatus="rented"
    }
const cars = await carModel.find(condition).toArray()

    return cars.length? res.status(200).json({message:"Done",cars}) : res.status(400).json({message:"no cars founds"})
    
}



const availableOrSpecific = async (req,res)=>{
    const {model} = req.body


 
    const cars = await carModel.find({$or:[{rentalStatus:"available",model},{rentalStatus:"rented",model}]}).toArray()
    
        return cars.length? res.status(200).json({message:"Done",cars}) : res.status(400).json({message:"no cars founds"})
        
}




export {
    getHondaToyota,getAvailableCars,rentedOrSpccific,availableOrSpecific
}