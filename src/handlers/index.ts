import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import slug from "slug";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
  try {

    // Validation Handlers
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
