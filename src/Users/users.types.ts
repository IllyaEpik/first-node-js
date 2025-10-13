
export interface IUsers {
    id: Number,
    name: String,
    password: String,
    email: String
}
export interface IBody {
    count: Number
}
export interface IAnswer {
    response:string | IUsers | IUsers[],
    status:number
}
