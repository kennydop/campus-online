import User from "../models/User.js";
import bcrypt from "bcrypt";


export const createNewUser = async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        });
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
}

export const logInUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
    
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

export const resetUserPassword = async (req, res) => {
    try {
      //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = await User.findByIdAndUpdate(req.body.userId, {password: hashedPassword})
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}