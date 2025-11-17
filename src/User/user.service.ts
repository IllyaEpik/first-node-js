
import type {IServiceContract} from "./user.types.ts";
import repository from "./user.repository.ts";
import SECRET_KEY from "../config/env.ts";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
const usersMethods:IServiceContract = {
    registation: async (user) => {
        const createdUser = await repository.createUser(user);
        if (createdUser){
            const token = jwt.sign({id: createdUser.id},SECRET_KEY,{
                expiresIn:"7d"
            })
            return token + "|200"
        }

        return "token is wrong |400"
        
    },
    login: async (userData) => {
        const user = await repository.getUser(userData.email)
        if (!user){
            return "doesn't exist user with this email |400"
        }
        // const hashedPassword = await hash(userData.password,10)
        if (!await compare(userData.password,user?.password)){
            return "wrong password or email |400"
        }
        const token = jwt.sign({id:user.id},SECRET_KEY,{
            expiresIn:"7d"
        })
        return token + "|200"
    },
    me: async (id) => {
        const user = await repository.getUserById(id)
        if (!user){
            return `doesn't exist user with id ${id} |400`
        }
        return user
    }
}

export default usersMethods