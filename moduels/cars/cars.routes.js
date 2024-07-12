import { Router } from "express";
import {addCar,getAll,getCar,updateCar,deleteCar} from './cars.controller.js'


const carRouters= Router()


carRouters.post('/addCar',addCar)
carRouters.get('/getAll',getAll)
carRouters.get('/getCar/:id',getCar)
carRouters.put('/updateCar/:id',updateCar)
carRouters.delete('/deleteCar/:id',deleteCar)
export default carRouters