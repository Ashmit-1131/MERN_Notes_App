// src/components/NoteCard.js
import React from "react";
import "./NoteCard.css";

const NoteCard = ({ note, handleEdit, handleDelete, handleView }) => {
  const onCardClick = () => {
    handleView(note);
  };

  const onEditClick = (e) => {
    e.stopPropagation(); // Prevent card click
    handleEdit(note);
  };

  const onDeleteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    handleDelete(note);
  };

  return (
    <div className="note-card" onClick={onCardClick}>
      <div className="note-card-content">
        <h5 className="card-title">{note.title}</h5>
        <h6 className="card-subtitle">
          {note.category} {note.username && `— ${note.username}`}
        </h6>
        <p className="card-text">{note.content}</p>
      </div>
      <div className="note-card-buttons">
        <button className="btn btn-sm btn-secondary me-2" onClick={onEditClick}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
