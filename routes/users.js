import {Router} from "express";
import { verifyUser } from "../authStrategies/authenticate.js";
import { deleteUser, getAUser, handleFollow, updateUserInfo, getFollowSuggestions, getNotLoggedInFollowSuggestions, searchUser, checkFollow } from "../controllers/usersControllers.js";

const router = Router();

//get currently signed in user
router.get("/currentUser", verifyUser, (req, res) => {res.send(req.user)})

//update user
router.put("/:id", verifyUser, updateUserInfo);

//delete user
router.delete("/:id", verifyUser, deleteUser);

//get a user
router.get("/:id", getAUser);

//follow a user
router.put("/:id/follow", handleFollow);

//check if following user
router.get("/isfollowing", checkFollow);

//get follow suggestions
router.get("/suggestions/nl", getNotLoggedInFollowSuggestions); //not logged in
router.get("/:id/suggestions", getFollowSuggestions); //logged in 

//search user
router.get("/", searchUser)

// router.post("/colleges/add", async (req, res)=>{
//   const cols = ["Accra Technical University", "Accra Institute of Technology", "Academic City University College", "Advanced Business College", "African University College of Communications", "All Nations University", "Anglican University College of Technology", "Ashesi University", "BlueCrest College", "Catholic Institute of Business and Technology", "Bolgatanga Polytechnic", "Cape Coast Technical University", "Central University", "Christ Apostolic University College", "Christian Service University College", "Dominion University College", "Data Link Institute", "Catholic University College of Ghana", "Garden City University College", "Ghana Christian University College", "Evangelical Presbyterian University College", "Ghana Institute of Journalism", "Ghana Baptist University College", "Ghana Institute of Languages", "Ghana Institute of Management and Public Administration", "Islamic University College, Ghana", "Ho Technical University", "Jayee University College", "KAAF University College", "Knutsford University College", "Kings University College", "Kessben College", "Ghana Technology University College", "Kumasi Technical University", "Mountcrest University College", "Kwame Nkrumah University of Science and Technology", "Methodist University College", "Maranatha University College", "Marshalls University College", "Lancaster University, Ghana", "Pentecost University College", "Koforidua Technical University", "Tamale Technical University", "Regional Maritime University", "Presbyterian University College", "Radford University College", "Spiritan University College", "University College of Agriculture and Environmental Studies", "Regent University College of Science and Technology", "Takoradi Technical University", "Sunyani Technical University", "Perez University College", "University for Development Studies", "University College of Management Studies", "University of Cape Coast", "University of Education, Winneba", "University of Energy and Natural Resources", "University of Ghana", "University of Health and Allied Sciences", "University of Mines and Technology", "University of Professional Studies, Accra", "Valley View University", "Wa Polytechnic", "Wisconsin International University College", "West End University College", "Zenith University College", "Webster University Ghana"]
//   cols.forEach((col)=>{
//     const college = new College({
//       name: col
//     })
//     college.save()
//   })
//   res.send("done")
// })

export default router;
