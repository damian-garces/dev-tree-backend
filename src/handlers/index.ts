import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import slug from "slug";
import { generateJWT } from "../utils/jwt";

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

    const token = generateJWT({ id: user._id });

    console.log("Login successful:", user);
    res.status(200).send({ token });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send('Internal Server Error');
  }
};

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    console.log("Update profile request body:", req.body);

    const { description } = req.body;

    const handle = slug(req.body.handle, "");
    const handleExist = await User.findOne({ handle });

    if (handleExist && handleExist.email !== req.user.email) {
      console.info("Handle already exists:", handle);
      return res.status(409).send('Handle already exists');
    }

    req.user.handle = handle;
    req.user.description = description;

    await req.user.save();

    return res.status(200).json({message: "Profile updated successfully"});
  } catch (e) {
    console.error(e);
    const error = new Error('Error updating profile');
    return res.status(400).json({error: error.message});
  }
}
