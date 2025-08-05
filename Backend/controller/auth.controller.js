//let users = []; //create new array named users: In-memory user storage (temporary)

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export async function register(req, res) {
  try {
    const { username, email, password, profession, location } = req.body;

    const existing = await User.findOne({ username }, { email }, { profession }, { location });
    if (existing) return res.status(400).send({ message: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); //bcrypt le pass lai hash garcha,10 bhane ko hash kattiko secure rakhne

    const user = new User({ username, email, password: hashedPassword, profession, location });
    await user.save();
  } catch (e) {
    return res.status(500).send(e);
  } finally {
    res.status(201).json({ message: "User registered successfully " });
  }
}

export async function login(req, res) {
  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = await User.findOne({ username }).select('-password');
    
    res.json({ message: "Login successful", user: userData, token });
  } catch (e) {
    console.error("Login Error", e.message);
    return res.status(500).send(e);
  }
}

//get all user registered

  export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password"); //retrieve all docs and exclude password from result
    res.status(200).json(users); //sends list of users
  } catch (e) {
    //if error occurs display message
    res.status(500).json(e);
  }
}
 

{/*}
  export async function getAllUsers(req, res) {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { profession: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ]
    }).select("-password");

    res.status(200).json({ data: users });
  } catch (e) {
    res.status(500).json(e);
  }
}
*/}