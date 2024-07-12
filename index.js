import express from 'express'
import { connection } from './db/dbConnection.js'
import userRouter from './moduels/users/users.routes.js'

import carRouters from './moduels/cars/cars.routes.js'
import specialRoutes from './moduels/specials/special.routes.js'
import rentalRouter from './moduels/rental/rental.routes.js'


const app = express()
const port = 3000

connection()


app.use(express.json())


app.use('/users',userRouter)
app.use('/rentals',rentalRouter)
app.use('/cars',carRouters)
app.use('/specials',specialRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))