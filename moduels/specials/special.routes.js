import { Router } from "express";
import { getHondaToyota,getAvailableCars,rentedOrSpccific,availableOrSpecific } from "./special.controller.js";



const specialRoutes = Router()


specialRoutes.get('/getHondaToyota',getHondaToyota)
specialRoutes.get('/getAvailableCars',getAvailableCars)
specialRoutes.get('/rentedOrSpccific',rentedOrSpccific)
specialRoutes.get('/availableOrSpecific',availableOrSpecific)
export default specialRoutes 