
import type {IServiceContract} from "./user.types.ts";
import repository from "./user.repository.ts";
import SECRET_KEY from "../config/env.ts";
import jwt from "jsonwebtoken";
const usersMethods:IServiceContract = {
    registation: async (user) => {
        const createdUser = await repository.createUser(user);
        if (createdUser){
            const token = jwt.sign({id: createdUser.id},SECRET_KEY,{
                expiresIn:"7d"
            })
            return token
        }

        return "error"
        
    },
    login: async (userData) => {
        const user = await repository.getUser(userData.email)
        if (!user){
            return "doesn't exist user with this nickname"
        }
        if (user?.password != userData.password){
            return "wrong password or email"
        }
        const token = jwt.sign({id:user.id},SECRET_KEY,{
            expiresIn:"7d"
        })
        return token
    },
    me: async (id) => {
        const user = await repository.getUserById(id)
        if (!user){
            return `doesn't exist user with id ${id}`
        }
        return user
    }
}

export default usersMethods