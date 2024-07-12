import { Router } from "express";
import { addRental,getAll,getRental,updateRental,deleteRental } from "./rental.controller.js";


const rentalRouter =Router()

rentalRouter.post('/addRental',addRental)
rentalRouter.get('/getAll',getAll)
rentalRouter.get('/getRental/:id',getRental)
rentalRouter.put('/updateRental/:id',updateRental)
rentalRouter.delete('/deleteRental/:id',deleteRental)
export default rentalRouter