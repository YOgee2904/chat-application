import express, { Request, Response } from "express";
import {
  createUser,
  loginUser,
  verifyUser,
} from "../controller/userController";
import { jwtMiddleware, refreshToken } from "../authentication/authenticate";
export const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get('/login/get', (req: Request, res: Response) => {
    res.send('hello')
})
router.post('/refresh-token', refreshToken)

router.use(jwtMiddleware);

router.get("/verify", verifyUser);
