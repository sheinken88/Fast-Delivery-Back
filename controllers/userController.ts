import { Request, Response } from "express";
import { generateToken } from "../config/token";

export const login = (req: Request, res: Response) => {
  try {
    const {text} = req.body
    const token = generateToken(text)
    console.log("Hola mundo");
    console.log("cookie", token);        
    res.cookie("token", token)
    res.status(200).send(token);
  } catch (error:any) { 
    throw Error(error)
  }
};

