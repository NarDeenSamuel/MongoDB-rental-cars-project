import {MongoClient} from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017');

 
export function connection(){

    client.connect()
    .then(() => {
        console.log("Connected successfully");
    })
    .catch((err) => {
        console.error("Database error: ", err.message);
        console.error("Error stack trace: ", err.stack);
    })
}
export const db = client.db('CarRentalSystem')

// db.collection('users').insertOne({name:"ahmed"})