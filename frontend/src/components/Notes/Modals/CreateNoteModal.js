import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { config } from "../../../utils/api";
import "./CreateNoteModal.css";

const CreateNoteModal = ({ show, handleClose, addNote, updateNote, note }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || "",
        content: note.content || "",
        category: note.category || "",
      });
    } else {
      setFormData({
        title: "",
        content: "",
        category: "",
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!formData.category) {
      alert("Category is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (note) {
        // Edit mode: update the note using PUT /api/:id
        const response = await axios.put(
          `${config.endpoint}/api/${note._id}`,
          formData,
          { headers: { Authorization: token } }
        );
        updateNote(response.data);
      } else {
        // Create mode: add a new note using POST /api
        const response = await axios.post(
          `${config.endpoint}/api/post`,
          formData,
          { headers: { Authorization: token } }
        );
        addNote(response.data);
      }
      handleClose();
      setFormData({ title: "", content: "", category: "" });
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{note ? "Edit Note" : "Create a Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNoteTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter note title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNoteContent" className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter note content (optional)"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formNoteCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Work">Work</option>
              <option value="Stress Management">Stress Management</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Fitness">Fitness</option>
              <option value="Love-Life">Love-Life</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : note
                ? "Update Note"
                : "Save Note"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNoteModal;
