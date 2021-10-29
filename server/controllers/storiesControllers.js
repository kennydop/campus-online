import Story from "../models/Story.js"
import User from "../models/User.js"

export const getFeedStories = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const followingsStories = await Story.find({userId: user.followings});
        const mystory = await Story.find({userId: req.params.id});
        const stories = [...mystory, ...followingsStories];
        res.status(200).json(stories);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

export const createStory = async (req, res) => {
    try{
        const story = await new Story (req.body)
        const savedStory = await story.save()
        res.status(200).json(savedStory)
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

export const updateStory = async (req, res) => {
    try{
        await Story.findByIdAndUpdate(req.params.id, {$set: req.body})
        const story = await Story.findById(req.params.id)
        res.status(200).json(story);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

export const deleteStory = async (req, res) => {
    try{
        await Story.findByIdAndDelete(req.params.id);
        res.status(200).json("story deleted")
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}