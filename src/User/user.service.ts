
import type {IServiceContract} from "./user.types.ts";
import repository from "./user.repository.ts";

const usersMethods:IServiceContract = {
    registation: async (user) => {
        if (user.confirmPassword != user.password){
            return "password and confirm password are different"

        }
        const gottenUser = await repository.createUser(user);
            return gottenUser
    },
    login: async (userData) => {
        const user = await repository.getUser(userData.email)
        if (!user){
            return "doesn't exist user with this nickname"
        }
        if (user?.password != userData.password){
            return "wrong password or email"
        }
        return user
    },
}

export default usersMethods