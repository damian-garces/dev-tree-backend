import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).send('User already exists');
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
};
