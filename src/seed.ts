import { PrismaClient } from "./generated/prisma/index.js";
const client = new PrismaClient

async function create(){
    await client.post.create({
    data:{
        description:"231",
        name:"hello"
    }
    })
}
create()