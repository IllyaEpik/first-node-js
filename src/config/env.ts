import {cleanEnv, str} from "envalid";

const SECRET_KEY = cleanEnv(process.env, {
    "SECRET_KEY":str()
}).SECRET_KEY
console.log(SECRET_KEY)
export default SECRET_KEY