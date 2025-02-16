const express=require("express")

const {createNote,updateNote, deleteNote, getNote}=require("../Controller/noteController");
const authMidddleware = require("../middleware/authMiddleware");

const router=express.Router()


router.post("/post",authMidddleware, createNote)
router.get("/",authMidddleware, getNote)
router.put("/:id",authMidddleware,updateNote)
router.delete("/:id",authMidddleware,deleteNote)



module.exports=router;


