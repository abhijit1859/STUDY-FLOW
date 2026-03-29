import mongoose, { mongo } from 'mongoose'

export const connectDb =  async ()=>{
    try {
      
        await mongoose.connect(process.env.MONGO_URL!)
        .then(()=>{
            console.log("conncted to db successfully")
        })
        
    } catch (error) {
        console.log("error while connecting to db", error)
        process.exit(1);
    }
}