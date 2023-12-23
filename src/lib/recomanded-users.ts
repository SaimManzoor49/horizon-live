import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecomanded = async()=>{
    const users = await db.user.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })

    
    return users
}