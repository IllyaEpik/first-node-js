import type{IServiceContract } from "./tag.types.ts";
import repository from "./tag.repository.ts";

const tagsMethods: IServiceContract = {
    getAll: async (data) => {
        return await repository.getAll(data)
    },
    getById: async (id) => {
        return await repository.getById(id)
    }
}
export default tagsMethods