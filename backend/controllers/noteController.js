const Note=require("../models/Note")

const createNote=async(req,res)=>{
    try{
   const {title,content,category}=req.body
   if(!title){
    return res.status(400).json({msg:"title is missing"})
    
   }
   const note=await Note.create({
    user:req.user.id,
    title,
    content,
    category,
})
res.status(201).json(note)
    }catch(err){

        return res.status(500).json({msg:"Server error"})
    }
}


const getNote=async(req,res)=>{
    try{
   const notes=await Note.find({user:req.user.id})
   res.json(notes)
    }catch(err){
        return res.status(500).json({msg:"Server error"})
    }
}





const updateNote=async(req,res)=>{
    try{
        const note =await Note.findById(req.params.id)
        if(!note) return res.status(404).json({msg:"Note not found"})

            if(note.user.toString()!==req.user.id){
                return res.status(401).json({msg:"Not authorized"})
            }
  const updatedNote=await Note.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.json(updatedNote)

    }catch(err){
        return res.status(500).json({msg:"Server error"})
    }

}


const deleteNote=async(req,res)=>{
    try{
        const note =await Note.findById(req.params.id)
        if(!note) return res.status(404).json({msg:"Note not found"})

            if(note.user.toString()!==req.user.id){
                return res.status(401).json({msg:"Not authorized"})
            }

       const deletednote =  await Note.findByIdAndDelete(req.params.id);
            res.json({msg:"Note has been deleted"})
    }catch(err){
        return res.status(500).json({msg:"Server error"})
    }
}

module.exports={createNote,updateNote,deleteNote,getNote}