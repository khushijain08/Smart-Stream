import React, { useState, useEffect } from 'react';
import { getDocumentById } from '../Service/documentService';
import { Spinner, Button, Form, FormGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import Base from '../component/Base';

const DocumentDetailPage = () => {
  const { id } = useParams(); // Get document ID from URL
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await getDocumentById(id);
        setDocument(response);
      } catch (error) {
        console.error('Error fetching document', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner color="primary" style={{ width: '4rem', height: '4rem' }} />
      </div>
    );
  }

  return (
    <Base>
      <div className="container mt-5" style={{ maxWidth: '800px', padding: '30px' }}>
        {/* Card to Wrap All Document Data */}
        <Card>
          <CardBody>
            {/* Document Title */}
            <CardTitle tag="h3" className="text-center" style={{ marginBottom: '20px', fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
              {document?.title}
            </CardTitle>

            {/* Document Body */}
            <CardText style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444', marginBottom: '40px', textAlign: 'justify' }}>
              <div dangerouslySetInnerHTML={{ __html: document?.body }} />
            </CardText>

            {/* Go Back Button */}
            <Button
              color="secondary"
              onClick={() => window.history.back()}
              style={{
                padding: '12px 24px',
                fontSize: '1.1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                display: 'block',
                margin: '0 auto',
              }}
            >
              Go Back
            </Button>
          </CardBody>
        </Card>
      </div>
    </Base>
  );
};

export default DocumentDetailPage;
