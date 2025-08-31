import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import slug from "slug";

export const createAccount = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).send('User already exists');
    }

    const handle = slug(req.body.handle, "");
    const handleExist = await User.findOne({ handle });

    if (handleExist) {
      return res.status(409).send('Handle already exists');
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
};

export const login =  async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("User found:", user);
    if (!user) {
      return res.status(409).send('User not found');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    console.log("Login successful:", user);
    res.status(200).send('Login successful');

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send('Internal Server Error');
  }
};
