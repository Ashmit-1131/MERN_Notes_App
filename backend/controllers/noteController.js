const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "title is missing" });
    }
    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      category,
    });
    
    // Emit socket event for note creation
    const io = req.app.get("io");
    if (io) {
      io.emit("noteAdded", note);
    }
    
    res.status(201).json(note);
  } catch (err) {
    console.error("Error creating note:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getNote = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    // Emit socket event for note update
    const io = req.app.get("io");
    if (io) {
      io.emit("noteUpdated", updatedNote);
    }
    
    res.json(updatedNote);
  } catch (err) {
    console.error("Error updating note:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Note.findByIdAndDelete(req.params.id);
    
    // Emit socket event for note deletion
    const io = req.app.get("io");
    if (io) {
      io.emit("noteDeleted", note._id);
    }
    
    res.json({ msg: "Note has been deleted" });
  } catch (err) {
    console.error("Error deleting note:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createNote, updateNote, deleteNote, getNote };
