import React, { useState, useEffect } from 'react';
import {
  Spinner,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import {
  getClassroomDetails,
  getNotesByClassroomName,
  uploadNote,
  downloadNoteByTitle,
} from '../Service/classroomService';
import { useParams } from 'react-router-dom';
import Base from './Base';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './class.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassroomDetailsPage = () => {
  const { classCode } = useParams();

  const [classroomData, setClassroomData] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [note, setNote] = useState({
    title: '',
    content: '',
    file: null,
  });

  const [stickyNote, setStickyNote] = useState({
    title: '',
    content: '',
  });

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Fetch classroom details and notes
  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const data = await getClassroomDetails(classCode);
        setClassroomData(data);
        const notesData = await getNotesByClassroomName(data.className);
        setNotes(notesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load classroom data');
        setLoading(false);
      }
    };

    fetchClassroomData();

    // Update time every second for the digital clock
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [classCode]);

  // Load sticky note data from localStorage
  useEffect(() => {
    const savedStickyNote = localStorage.getItem('stickyNote');
    if (savedStickyNote) {
      setStickyNote(JSON.parse(savedStickyNote));
    }
  }, []);

  // Store sticky note data in localStorage when it changes
  useEffect(() => {
    if (stickyNote.content) {
      localStorage.setItem('stickyNote', JSON.stringify(stickyNote));
    }
  }, [stickyNote]);

  // Toggle modal visibility
  const toggleModal = () => setModalOpen(!modalOpen);

  // Handle input changes for note and sticky note
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  // Handle file selection for note
  const handleFileChange = (e) => {
    setNote({
      ...note,
      file: e.target.files[0],
    });
  };

  // Submit form to upload a note
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', note.file);
    formData.append('classroomName', classroomData.className);
    formData.append('title', note.title);
    formData.append('content', note.content);

    try {
      await uploadNote(formData);
      toast.success('Note uploaded successfully!');
      setModalOpen(false);

      // Refresh notes after upload
      const notesData = await getNotesByClassroomName(classroomData.className);
      setNotes(notesData);
    } catch (err) {
      toast.error('Failed to upload note!');
    }
  };

  // Download a specific note by title
  const handleDownload = async (title) => {
    try {
      const fileData = await downloadNoteByTitle(title);
      const blob = new Blob([fileData], { type: 'application/octet-stream' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = title; // Use title as the file name
      link.click();
      URL.revokeObjectURL(downloadUrl); // Cleanup
    } catch (err) {
      toast.error('Failed to download note!');
    }
  };

  // Handle sticky note changes
  const handleStickyNoteChange = (e) => {
    const { name, value } = e.target;
    setStickyNote({
      ...stickyNote,
      [name]: value,
    });
  };

  // Render loading spinner or error message
  if (loading) {
    return (
      <Spinner
        color="primary"
        style={{
          margin: '0 auto',
          display: 'block',
          paddingTop: '20px',
        }}
      />
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the classroom details page
  return (
    <Base>
      <div className="classroom-details-page" style={{ padding: '20px', position: 'relative' }}>
        <Row>
          <Col md="12">
            <div style={{ paddingLeft: '20px' }}>
              <h1 className="classroom-title">{classroomData.className}</h1>
              <p className="subject">{classroomData.subject}</p>
              <p className="section">
                <strong>Section:</strong> {classroomData.section}
              </p>

              {classroomData.description && (
                <p className="description">
                  <strong>Description:</strong> {classroomData.description}
                </p>
              )}

              {classroomData.teacher && (
                <p className="teacher">
                  <strong>Teacher:</strong> {classroomData.teacher}
                </p>
              )}

              <Button color="primary" onClick={toggleModal} className="upload-button">
                Upload Note
              </Button>

              <div className="content-row">
                <div className="calendar-container">
                  <Calendar />
                </div>

                <div className="notes-section">
                  <h3>Uploaded Notes:</h3>
                  {notes.length > 0 ? (
                    <ListGroup className="notes-list">
                      {notes.map((note) => (
                        <ListGroupItem key={note.id} className="note-item">
                          <h5>{note.title}</h5>
                          <p>{note.content}</p>
                          <Button color="primary" onClick={() => handleDownload(note.title)}>
                            Download File
                          </Button>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  ) : (
                    <p>No notes uploaded yet!</p>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Sticky Note Component with Digital Watch */}
        <div className="sticky-note" style={{ position: 'absolute', top: '20px', right: '20px', width: '250px' }}>
          <div className="digital-watch" style={{ textAlign: 'center', fontSize: '18px', marginBottom: '10px' }}>
            {currentTime}
          </div>
          <h4>Sticky Note</h4>
          <textarea
            name="content"
            placeholder="Write your sticky note here"
            value={stickyNote.content}
            onChange={handleStickyNoteChange}
            rows="6"
            style={{ width: '100%' }}
          />
        </div>

        {/* Modal for uploading notes */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Upload Note</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleFormSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter note title"
                  value={note.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  type="textarea"
                  name="content"
                  id="content"
                  placeholder="Enter note content"
                  value={note.content}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="file">Upload File</Label>
                <Input type="file" name="file" id="file" onChange={handleFileChange} />
              </FormGroup>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Upload
                </Button>
                <Button color="secondary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>

        <ToastContainer />
      </div>
    </Base>
  );
};

export default ClassroomDetailsPage;
