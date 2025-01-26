import React, { useState, useEffect, useRef } from 'react';
import { createDocument, getUserDocuments, deleteDocument } from '../Service/documentService';
import { Button, Input, ListGroup, ListGroupItem, Spinner, Row, Col, Card, CardBody } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import Base from '../component/Base';

const DocumentForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const editor = useRef(null);

  const stripHTMLTags = (html) => html.replace(/<[^>]*>/g, '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body cannot be empty!");
      return;
    }
    const strippedBody = stripHTMLTags(body);
    onSubmit({ title: title.trim(), body: strippedBody });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter document title"
        required
        className="mb-3 p-3"
      />
      <JoditEditor
        ref={editor}
        value={body}
        onChange={setBody}
        tabIndex={1}
        className="mb-3"
      />
      <Button type="submit" color="primary" className="mt-3">
        Upload Document
      </Button>
    </form>
  );
};

const DocumentList = ({ documents, onDelete, onView }) => {
  const [visibleDocumentId, setVisibleDocumentId] = useState(null);

  const toggleDocumentVisibility = (id) => {
    setVisibleDocumentId((prevId) => (prevId === id ? null : id));
  };

  return (
    <ListGroup className="mb-5">
      {documents.length > 0 ? (
        documents.map((doc) => (
          <ListGroupItem
            key={doc.id}
            className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded"
          >
            <div>
              <h5>{doc.title}</h5>
              <p>{visibleDocumentId === doc.id ? doc.body : `${doc.body.slice(0, 100)}...`}</p>
            </div>
            <div>
              <Button
                color="info"
                onClick={() => {
                  toggleDocumentVisibility(doc.id);
                }}
                className="mr-3 mb-2"
              >
                {visibleDocumentId === doc.id ? 'Hide' : 'View'}
              </Button>
              <Button
                color="danger"
                onClick={() => onDelete(doc.id)}
                className="mb-2"
              >
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))
      ) : (
        <p>No documents available</p>
      )}
    </ListGroup>
  );
};

const DocumentPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await getUserDocuments();
        setDocuments(response);
      } catch (error) {
        toast.error('Error fetching documents');
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleCreateDocument = async ({ title, body }) => {
    try {
      const response = await createDocument({ title, body });
      toast.success('Document created successfully!');
      setDocuments((prevDocs) => [...prevDocs, response]);
    } catch (error) {
      toast.error('Error creating document');
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id);
      toast.success('Document deleted successfully!');
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    } catch (error) {
      toast.error('Error deleting document');
    }
  };

  const handleViewDocument = (id) => {
    navigate(`/documents/${id}`);
  };

  return (
    <Base>
      <div className="container mt-5">
        <Card className="mb-5">
          <CardBody>
            <h3>Create New Document</h3>
            <DocumentForm onSubmit={handleCreateDocument} />
          </CardBody>
        </Card>

        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            <h3>Your Documents</h3>
            <DocumentList
              documents={documents}
              onDelete={handleDeleteDocument}
              onView={handleViewDocument}
            />
          </>
        )}

        <footer className="footer mt-5">
          <Row className="justify-content-center">
            <Col xs="12" className="text-center">
              <p className="footer-links">
                <a href="#focus-room">Focus Room</a> | <a href="#how-it-works">How it works</a> |
                <a href="#community">Community</a> | <a href="#rules">Rules</a> |
                <a href="#contact-us">Contact Us</a>
              </p>
              <p className="footer-legal">Terms & Conditions | Privacy Policy</p>
            </Col>
          </Row>
        </footer>

        <ToastContainer />
      </div>
    </Base>
  );
};

export default DocumentPage;