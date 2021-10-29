import User from "../models/User.js";
import bcrypt from "bcrypt";

export const updateUserInfo = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
            });
            const userToReturn = await User.findById(req.params.id);
            res.status(200).json(userToReturn);
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
    return res.status(403).json("You can update only your account!");
    }
}

export const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
}

export const getAUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const handleFollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
                if (!user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $push: { followers: req.body.userId } });
                    await currentUser.updateOne({ $push: { followings: req.params.id } });
                    res.status(200).json("user has been followed");
                } else {
                    await user.updateOne({ $pull: { followers: req.body.userId } });
                    await currentUser.updateOne({ $pull: { followings: req.params.id } });
                    res.status(200).json("user has been unfollowed");
                }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
}

//get suggested to follows
export const getFollowSuggestions = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const matches = await User.find( {$and: [
            {$or: [{from: user.from}, {city: user.city}]},
            {_id: {$ne: req.params.id}},
            {followers: {$ne: req.params.id}}
        ]});
        console.log(matches)
        res.status(200).json(matches);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}
//unfollow a user

// router.put("/:id/unfollow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//       try {
//         const user = await User.findById(req.params.id);
//         const currentUser = await User.findById(req.body.userId);
//         if (user.followers.includes(req.body.userId)) {
//           await user.updateOne({ $pull: { followers: req.body.userId } });
//           await currentUser.updateOne({ $pull: { followings: req.params.id } });
//           res.status(200).json("user has been unfollowed");
//         } else {
//           res.status(403).json("you dont follow this user");
//         }
//       } catch (error) {
//         res.status(500).json(error);
//       }
//     } else {
//       res.status(403).json("you cant unfollow yourself");
//     }
//   });