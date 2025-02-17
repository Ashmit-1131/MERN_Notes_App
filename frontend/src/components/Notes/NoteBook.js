import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Spinner,Form } from 'react-bootstrap';
import axios from 'axios';
import CreateNoteModal from './Modals/CreateNoteModal';
import NoteCard from './NoteCard';
import ViewNoteModal from './Modals/ViewNoteModal';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import './NoteBook.css';
import { config } from '../../utils/api';
import CategoryFilter from './CategoryFilter';

// Implemented filter and category
const NoteBook = () => {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [viewNote, setViewNote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // New state for search
  
  
    useEffect(() => {
      const fetchNotes = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setFetchError('User not authenticated. Please log in.');
          return;
        }
        setIsLoading(true);
        try {
          const response = await axios.get(`${config.endpoint}/api`, {
            headers: { Authorization: token },
          });
          setNotes(response.data);
        } catch (error) {
          setFetchError('Error fetching notes. Please try again later.');
        }
        setIsLoading(false);
      };
  
  
      fetchNotes();
    }, []);
  
  
    const addNote = (newNote) => {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    };
  
  
    const updateNoteInState = (updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      );
    };
  
  
    const handleEdit = (note) => {
      setEditingNote(note);
      setShowModal(true);
    };
  
  
    const handleDelete = async (noteToDelete) => {
      if (window.confirm(`Are you sure you want to delete "${noteToDelete.title}"?`)) {
        const token = sessionStorage.getItem('token');
        try {
          await axios.delete(`${config.endpoint}/api/${noteToDelete._id}`, {
            headers: { Authorization: token },
          });
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note._id !== noteToDelete._id)
          );
        } catch (error) {
          console.error('Error deleting note:', error);
          alert('Error deleting note. Please try again.');
        }
      }
    };
  
  
    const handleView = (note) => {
      setViewNote(note);
    };
  
  
    const handleModalClose = () => {
      setEditingNote(null);
      setShowModal(false);
    };
  
  
    const handleViewClose = () => {
      setViewNote(null);
    };
  
  
    // Filtering notes based on category and search query
    const filteredNotes = notes.filter(
      (note) =>
        (!selectedCategory || note.category === selectedCategory) &&
        (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
  
    return (
      <>
        <Header />
        <Container className="notebook-page">
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="page-title">My Notes</h2>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingNote(null);
                  setShowModal(true);
                }}
                className="write-note-btn"
              >
                Write Your Note Now
              </Button>
            </Col>
          </Row>
  
  
          {/* Search Bar */}
          <Row className="justify-content-center mt-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search by title, content, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
          </Row>
  
  
          {/* Category Filter */}
          <Row className="justify-content-center mt-3">
            <Col md={4} className="text-center">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </Col>
          </Row>
  
  
          {/* Notes Display */}
          {isLoading ? (
            <Row className="mt-4 justify-content-center">
              <Spinner animation="border" />
            </Row>
          ) : fetchError ? (
            <Row className="mt-4 justify-content-center">
              <p>{fetchError}</p>
            </Row>
          ) : filteredNotes.length > 0 ? (
            <Row className="mt-4">
              {filteredNotes.map((note) => (
                <Col key={note._id} md={4}>
                  <NoteCard
                    note={note}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleView={handleView}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="mt-4 justify-content-center">
              <p>No notes found matching your search.</p>
            </Row>
          )}
  
  
          <CreateNoteModal
            show={showModal}
            handleClose={handleModalClose}
            addNote={addNote}
            updateNote={updateNoteInState}
            note={editingNote}
          />
  
  
          <ViewNoteModal
            show={!!viewNote}
            handleClose={handleViewClose}
            note={viewNote}
          />
        </Container>
        <Footer />
      </>
    );
  };
  
  
  export default NoteBook;