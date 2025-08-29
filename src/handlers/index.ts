import { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
  try {

    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).send('User already exists');
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
};
