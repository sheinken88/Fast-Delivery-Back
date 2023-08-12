import { Request, Response } from "express";
import { generateToken } from "../config/token";

export const login = (req: Request, res: Response) => {
  try {
    const {text} = req.body
    console.log("text", text);
    
    const token = generateToken(text)

    res.cookie("token", token)
    res.status(200).send(token);
    
  } catch (error:any) { 
    throw Error(error)
  }
};

