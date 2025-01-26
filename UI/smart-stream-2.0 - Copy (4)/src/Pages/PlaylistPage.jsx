import React, { useEffect, useState } from 'react';
import {
    Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter,
    Card, CardBody, CardTitle, CardText, Row, Col
} from 'reactstrap';
import { createPlaylist, getAllPlaylists, deletePlaylist, updatePlaylist } from '../Service/playlistService';
import Base from '../component/Base';

const PlaylistPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylist, setNewPlaylist] = useState({ title: '', description: '', videos: [] });
    const [modal, setModal] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [videoLink, setVideoLink] = useState('');
    const [showAllVideos, setShowAllVideos] = useState({});

    const loggedInUsername = localStorage.getItem('username');

    useEffect(() => {
        getAllPlaylists()
            .then((data) => setPlaylists(data))
            .catch((error) => console.error('Error fetching playlists:', error));
    }, []);

    const toggleModal = () => {
        setModal(!modal);
        if (currentPlaylist) {
            setNewPlaylist({
                title: currentPlaylist.title,
                description: currentPlaylist.description,
                videos: currentPlaylist.videos
            });
        } else {
            setNewPlaylist({ title: '', description: '', videos: [] });
        }
    };

    const handleChange = (e) => {
        setNewPlaylist({ ...newPlaylist, [e.target.name]: e.target.value });
    };

    const handleAddVideoLink = () => {
        if (videoLink && !newPlaylist.videos.includes(videoLink)) {
            setNewPlaylist({
                ...newPlaylist,
                videos: [...newPlaylist.videos, videoLink]
            });
            setVideoLink('');
        } else {
            alert('Please enter a valid or unique video link.');
        }
    };

    const handleCreatePlaylist = (e) => {
        e.preventDefault();
        createPlaylist({ ...newPlaylist, createdBy: loggedInUsername })
            .then((data) => {
                setPlaylists([...playlists, data]);
                setNewPlaylist({ title: '', description: '', videos: [] });
                toggleModal();
            })
            .catch((error) => console.error('Error creating playlist:', error));
    };

    const handleDeletePlaylist = (id) => {
        deletePlaylist(id)
            .then(() => {
                setPlaylists(playlists.filter((playlist) => playlist.id !== id));
            })
            .catch((error) => console.error('Error deleting playlist:', error));
    };

    const handleUpdatePlaylist = (e) => {
        e.preventDefault();
        updatePlaylist(currentPlaylist.id, newPlaylist)
            .then((updatedPlaylist) => {
                setPlaylists(playlists.map((playlist) => (playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist)));
                setCurrentPlaylist(null);
                toggleModal();
            })
            .catch((error) => console.error('Error updating playlist:', error));
    };

    const toggleShowAllVideos = (playlistId) => {
        setShowAllVideos((prevState) => ({
            ...prevState,
            [playlistId]: !prevState[playlistId],
        }));
    };

    return (
        <Base>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <Button color="primary" onClick={toggleModal} className="mt-4 mb-3 custom-create-button">Create Playlist</Button>
                    <div style={{ fontSize: '16px', fontStyle: 'italic', color: '#5a5a5a' }}>
                        "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
                    </div>
                </div>

                <Row className="mt-4">
                    {playlists.map((playlist) => (
                        <Col sm="12" md="6" lg="4" key={playlist.id}>
                            <Card className="mb-4" style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
                                <CardBody>
                                    <CardTitle tag="h5">{playlist.title}</CardTitle>
                                    <CardText>{playlist.description}</CardText>

                                    {/* Video Thumbnails */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {showAllVideos[playlist.id]
                                            ? playlist.videos.map((video, index) => (
                                                <iframe
                                                    key={index}
                                                    width="100%"
                                                    height="200px"
                                                    src={video.replace('watch?v=', 'embed/')}
                                                    title={`Video ${index + 1}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ))
                                            : playlist.videos.slice(0, 1).map((video, index) => (
                                                <iframe
                                                    key={index}
                                                    width="100%"
                                                    height="200px"
                                                    src={video.replace('watch?v=', 'embed/')}
                                                    title={`Video ${index + 1}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ))}
                                    </div>

                                    {playlist.videos.length > 1 && (
                                        <Button
                                            color="link"
                                            onClick={() => toggleShowAllVideos(playlist.id)}
                                            style={{ textDecoration: 'underline' }}
                                        >
                                            {showAllVideos[playlist.id] ? 'Show Less' : 'See More'}
                                        </Button>
                                    )}

                                    {/* Edit/Delete Actions */}
                                    {playlist.createdBy === loggedInUsername && (
                                        <div className="mt-3 d-flex justify-content-between">
                                            <Button color="danger" onClick={() => handleDeletePlaylist(playlist.id)} className="custom-delete-button">
                                                Delete
                                            </Button>
                                            <Button
                                                color="warning"
                                                onClick={() => {
                                                    setCurrentPlaylist(playlist);
                                                    toggleModal();
                                                }}
                                                className="custom-edit-button"
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Modal isOpen={modal} toggle={toggleModal} backdrop="static">
                    <ModalHeader toggle={toggleModal}>
                        {currentPlaylist ? 'Update Playlist' : 'Create Playlist'}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={currentPlaylist ? handleUpdatePlaylist : handleCreatePlaylist}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={newPlaylist.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter playlist title"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={newPlaylist.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter playlist description"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="videoLink">Add YouTube Video Link</Label>
                                <Input
                                    type="text"
                                    name="videoLink"
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                    placeholder="Enter YouTube video URL"
                                />
                                <Button color="secondary" onClick={handleAddVideoLink} className="mt-2">Add Video</Button>
                            </FormGroup>
                            <div>
                                <strong>Videos:</strong>
                                <ul>
                                    {newPlaylist.videos.map((video, index) => (
                                        <li key={index}>{video}</li>
                                    ))}
                                </ul>
                            </div>
                            <Button color="primary" type="submit" className="custom-create-button">
                                {currentPlaylist ? 'Update' : 'Create'}
                            </Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </Base>
    );
};

export default PlaylistPage;
