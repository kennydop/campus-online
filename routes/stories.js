import {Router} from "express";
import { createStory, deleteStory, getFeedStories, updateStory } from "../controllers/storiesControllers.js";

const router = Router();

//get stories //takes user id
router.get('/:id', getFeedStories)

//create story
router.post('/', createStory);

//update a story //takes story id
router.put('/:id', updateStory);

//delete story //takes story id
router.delete('/:id', deleteStory);

export default router;