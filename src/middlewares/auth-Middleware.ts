import type { NextFunction, Request, Response } from "express";
import type{UserSecurity,IJWT } from "../User/user.types.ts";
import SECRET_KEY from "../config/env.ts";
import jwt from "jsonwebtoken";

// type IAuthMiddleware = (
//     req:Request,
//     res:Response) => Promise<void>
async function authMiddleware(
    req:Request<object, UserSecurity | string, object>,
    res:Response<any>,
    next: NextFunction
){
    try {
            const encodedToken = req.headers.authorization;

            if (!encodedToken){
                res.status(401).json("where is token")
                return
            }
            const [bearer, token] = encodedToken.split(" ")
            if (bearer != "Bearer"){
                return
            }
            if (typeof token !== "string"){
                return
            }

            const decoded = jwt.verify(token,SECRET_KEY) as IJWT
            if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
                res.status(401).json("invalid token payload")
                return
            }
            const id = Number(decoded.id)
            if (isNaN(id)) {
                res.status(401).json("invalid token id")
                return
            }
            console.log(id,"idK")
            res.locals.userId = id
            await next()
        } catch (error) {
            if ((error as any).name === "TokenExpiredError") {
                res.status(401).json("token expired")
                return
            }
            res.status(500).json(String(error))
        }
}
export default authMiddleware