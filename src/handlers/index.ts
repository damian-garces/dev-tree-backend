import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import slug from "slug";
import { generateJWT } from "../utils/jwt";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
import { v4 as uuidv4 } from 'uuid';

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

    const { description, links } = req.body;

    const handle = slug(req.body.handle, "");
    const handleExist = await User.findOne({ handle });

    if (handleExist && handleExist.email !== req.user.email) {
      console.info("Handle already exists:", handle);
      return res.status(409).send('Handle already exists');
    }

    req.user.handle = handle;
    req.user.description = description;
    req.user.links = links;

    await req.user.save();

    return res.status(200).send("Profile updated successfully");
  } catch (e) {
    console.error(e);
    const error = new Error('Error updating profile');
    return res.status(400).json({error: error.message});
  }
}

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, async (err, fields, files) => {
      cloudinary.uploader.upload(files.image[0].filepath, { public_id: uuidv4() }, async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).send('Error uploading image');
        }
        console.log("Cloudinary upload successful:", result);
        if (result && result.secure_url) {
          console.log("Cloudinary upload result:", result.secure_url);
          req.user.imageUrl = result.secure_url;
          await req.user.save();
          return res.status(200).json({ imageUrl: result.secure_url });
        }
      });
    });
  } catch (e) {
    console.error(e);
    const error = new Error('Error uploading image');
    return res.status(400).json({error: error.message});
  }
}

export const getUserByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;
    const user = await User.findOne({ handle }).select('-password -email -__v');
    if (!user) {
      const error = new Error('User not found');
      return res.status(404).json({error: error.message});
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    const error = new Error('Error getting user by handle');
    return res.status(500).json({error: error.message});
  }
}

export const searchByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.body;
    console.log("Searching for handle:", handle);
    const user = await User.findOne({ handle }).select('-password -email -__v');
    if (user) {
      const error = new Error('User already exists');
      return res.status(409).json({error: error.message});
    }
    res.status(200).send(`${handle} is available`);
  } catch (e) {
    console.error(e);
    const error = new Error('Error searching user by handle');
    return res.status(500).json({error: error.message});
  }
}
