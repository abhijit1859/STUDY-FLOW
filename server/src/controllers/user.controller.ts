
// import type { Response,Request } from "express"
// import type { AuthenticatedRequest } from "../middlewares/auth.js"
// import { clerkClient } from "../utils/clerk.js"
// import { User } from "../models/user.model.js"
// export const saveUser = async (req:Re,res:Response)=>{
//     try {
        
//         const user = await clerkClient.users.getUser(req.userId)
//         const existing = await User.findOne({userId:req.userId})
//         if(!existing){
//             await User.create({
//                 name:user.firstName+" "+user.lastName,
//                 email:user.emailAddresses[0]?.emailAddress,
//                 userId:user.id
//             })
//         }

//         res.status(201).json({
//             message:"user created"
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             error:error.message
//         })
//     }
// }