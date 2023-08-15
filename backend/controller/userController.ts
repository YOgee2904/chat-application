import  { Request, Response } from "express";
import { userCollection as users } from "../model/model";
import {
  createHash,
  createSalt,
  verifyHash,
} from "../authentication/generateHash";
import { generateRefreshToken, generateToken } from "../authentication/authenticate";
// validate Email
function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//create user

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!validateEmail(email))
    return res.status(400).json({ message: "Invalid Email" });
  try {
    const user = await users.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = createSalt();
    const hash = createHash(password, salt);
    const newuser = await users.insertOne({
      name,
      email,
      hash,
      salt,
    });
    const token = generateToken({ name, email });
    const refreshToken = generateRefreshToken({email})
    res.status(201).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//login user

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isVerified = verifyHash({
      password: password,
      salt: user.salt,
      hash: user.hash,
    });
    if(!isVerified) return res.status(401).json({"error" : "You are not Authenticated"})
    const token = generateToken({ name: user.name, email });
    const refreshToken = generateRefreshToken({email})
    res.status(201).json({ token: token, refreshToken: refreshToken});
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//get user

export async function verifyUser(req: Request, res: Response) {
  const { email, name } = req.user;
  try {
    const user = await users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(201).json({ email, name });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

