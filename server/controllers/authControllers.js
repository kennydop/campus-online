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
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const logInUser = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email });
        if(!user) {user = await User.findOne({ username: req.body.email })}
        !user && res.status(404).json("user not found");
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        const { password, ...other } = user._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

export const logInWithProvider = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email });
        if(!user) {user = await User.findOne({ username: req.body.email })}
        if(!user){
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                provider: req.params.provider,
            });
            user = await newUser.save();
        }
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

export const resetUserPassword = async (req, res) => {
    try {
      //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = await User.findByIdAndUpdate(req.body.userId, {password: hashedPassword})
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}