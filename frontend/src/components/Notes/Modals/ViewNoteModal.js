
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ViewNoteModal.css";

const ViewNoteModal = ({ show, handleClose, note }) => {
  if (!note) return null; 

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title >{note.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-muted mb-3">
          {note.category ? `Category: ${note.category}` : "No category"}
        </h6>
        <p className="view-note-content">{note.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewNoteModal;
