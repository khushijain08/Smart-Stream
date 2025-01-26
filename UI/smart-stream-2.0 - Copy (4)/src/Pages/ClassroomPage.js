import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { createClassroom, getAllClassrooms, joinClassroom, searchClassrooms, deleteClassroom } from '../Service/classroomService';
import Base from '../component/Base';
import { useNavigate } from 'react-router-dom';
import './YourStyles.css'; // Import custom CSS

const ClassroomPage = ({ userId }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [classroomData, setClassroomData] = useState({ searchQuery: '' });
  const [token, setToken] = useState(''); // Ensure token is fetched from context or local storage
  const [modal, setModal] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchBy, setSearchBy] = useState('className');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      setLoading(true);
      try {
        const data = await getAllClassrooms();
        setClassrooms(data);
      } catch (error) {
        setError('Failed to load classrooms.');
      }
      setLoading(false);
    };

    fetchClassrooms();
  }, []);

  const toggleModal = () => {
    setError(null);
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroomData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let newClassroom;
      if (isCreate) {
        // Send classroom data to backend to create a new classroom
        newClassroom = await createClassroom(classroomData, token);
        
        // Log the new classroom data to the console
        console.log('New Classroom Created:', newClassroom); // This will log the data returned by the API

        // Assuming the backend returns the classroom data with an ID, you can set it here
        setClassrooms((prevClassrooms) => [...prevClassrooms, newClassroom]);
      } else {
        // Join an existing classroom using the classCode
        await joinClassroom(classroomData.classCode, token);
        navigate(`/chat/${classroomData.classCode}`);
      }
      toggleModal();
    } catch (error) {
      setError('Failed to submit the form. Please try again.');
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const classroomsBySearch = await searchClassrooms(classroomData.searchQuery, searchBy);
      setClassrooms(classroomsBySearch);
    } catch (error) {
      setError('Failed to search classrooms.');
    }
    setLoading(false);
  };

  const handleCreateClick = () => {
    setIsCreate(true);
    setClassroomData({ className: '', section: '', subject: '', room: '' });
    toggleModal();
  };

  const handleJoinClick = () => {
    setIsCreate(false);
    setClassroomData({ classCode: '' });
    toggleModal();
  };

  const handleJoinClassroom = async (classCode) => {
    setLoading(true);
    try {
      await joinClassroom(classCode, token);
      navigate(`/classroom/${classCode}`);
    } catch (error) {
      setError('Failed to join the classroom.');
    }
    setLoading(false);
  };

  const handleDeleteClassroom = async (classroomId) => {
    setLoading(true);
    try {
      await deleteClassroom(classroomId);
      setClassrooms((prevClassrooms) => prevClassrooms.filter((classroom) => classroom.id !== classroomId));
    } catch (error) {
      setError('Failed to delete the classroom.');
    }
    setLoading(false);
  };

  return (
    <Base>
      <div className="classroom-container">
        <div className="classroom-header">
          <h1>STUDY-SPACE</h1>
          <p className="subtitle">"Your gateway to learning, collaboration, and success!"</p>
          <hr />
          <div className="button-group">
            <Button color="primary" onClick={handleCreateClick}>Create Classroom</Button>
            <Button color="secondary" onClick={handleJoinClick}>Join Classroom</Button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="search-panel">
          <Input
            type="text"
            name="searchQuery"
            value={classroomData.searchQuery}
            onChange={handleInputChange}
            placeholder={`Search by ${searchBy === 'className' ? 'Class Name' : 'Subject'}`}
          />
          <Button onClick={handleSearch} color="info">Search</Button>
        </div>

        {loading && <Spinner color="primary" />}
        {classrooms.length === 0 ? (
          <div className="no-classrooms">No classrooms available. Create one!</div>
        ) : (
          <div className="classroom-list">
            {classrooms.map((classroom) => (
              <div className="classroom-card" key={classroom.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{classroom.className}</h5>
                    <p className="card-text">{classroom.subject}</p>
                    <Button onClick={() => handleJoinClassroom(classroom.classCode)} color="primary">Join</Button>
                    <Button onClick={() => handleDeleteClassroom(classroom.id)} color="danger">Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{isCreate ? 'Create Classroom' : 'Join Classroom'}</ModalHeader>
          <ModalBody>
            <Form>
              {isCreate ? (
                <>
                  <FormGroup>
                    <Label for="className">Classroom Name</Label>
                    <Input
                      type="text"
                      name="className"
                      id="className"
                      placeholder="Enter classroom name"
                      value={classroomData.className}
                      onChange={handleInputChange}
                    />
                    {error && !classroomData.className && <small className="text-danger">Classroom name is required.</small>}
                  </FormGroup>

                  <FormGroup>
                    <Label for="section">Section</Label>
                    <Input
                      type="text"
                      name="section"
                      id="section"
                      placeholder="Enter section"
                      value={classroomData.section}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Enter subject"
                      value={classroomData.subject}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="room">Room</Label>
                    <Input
                      type="text"
                      name="room"
                      id="room"
                      placeholder="Enter room"
                      value={classroomData.room}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </>
              ) : (
                <FormGroup>
                  <Label for="classCode">Class Code</Label>
                  <Input
                    type="text"
                    name="classCode"
                    id="classCode"
                    placeholder="Enter class code"
                    value={classroomData.classCode}
                    onChange={handleInputChange}
                  />
                  {error && !classroomData.classCode && <small className="text-danger">Class code is required.</small>}
                </FormGroup>
              )}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            <Button color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <Spinner size="sm" color="light" /> : isCreate ? 'Create Classroom' : 'Join Classroom'}
            </Button>
          </ModalFooter>
        </Modal>

        {/* Footer Section */}
        <footer className="footer mt-8">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </Base>
  );
};

export default ClassroomPage;
