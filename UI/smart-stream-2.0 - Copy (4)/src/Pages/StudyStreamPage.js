import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Base from "../component/Base";
import './YourStyles.css';

const StudyStreamPage = () => {
    const profiles = [
        { img: 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp', country: 'USA', name: 'John Doe', bio: 'Software Engineer and Tech Enthusiast' },
        { img: 'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg', country: 'India', name: 'Amit Sharma', bio: 'Digital Marketer with a passion for Growth' },
        { img: 'https://www.profilebakery.com/wp-content/uploads/2023/04/Profile-Image-AI.jpg', country: 'UK', name: 'Emma Clarke', bio: 'AI Researcher and Innovator' },
        { img: 'https://www.profilebakery.com/wp-content/uploads/2023/04/AI-Profile-Picture.jpg', country: 'Canada', name: 'David Lee', bio: 'Cloud Architect and Cybersecurity Expert' },
    ];

    return (
        <Base>
            <div>
                {/* Upcoming Features Section */}
                <section className="bg-white text-black py-5">
                    <Container>
                        <h3 className="text-center mb-4 font-weight-bold">Upcoming Features</h3>
                        <Row className="justify-content-center">
                            <Col md="4">
                                <Card className="bg-primary text-white mb-4">
                                    <CardBody>
                                        <CardTitle className="font-weight-bold">Interactive Video Sessions</CardTitle>
                                        <CardText>Get ready to join video-based study sessions with peers globally!</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="4">
                                <Card className="bg-warning text-white mb-4">
                                    <CardBody>
                                        <CardTitle className="font-weight-bold">Personal Study Assistant</CardTitle>
                                        <CardText>Your personal AI study assistant will help you stay on track!</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Header Section with Animation */}
                <section className="bg-white text-center py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '60vh', marginTop: '10px', position: 'relative' }}>
                    <Container>
                        <h8 className="text-muted mb-5 font-weight-bold moving-text" style={{ lineHeight: '1.6', animation: 'fadeInUp 1.5s ease-out' }}>This is About</h8>
                        <h4 className="display-4 font-weight-bold moving-text" style={{ lineHeight: '1.5', animation: 'fadeInUp 2s ease-out' }}>
                            Study with the <span role="img" aria-label="earth">🌍</span>'s largest
                        </h4>
                        <h4 className="display-4 font-weight-bold moving-text" style={{ lineHeight: '1.3', animation: 'fadeInUp 2.5s ease-out' }}>
                            community of students live
                        </h4>
                        <p className="lead mt-4 font-weight-bold moving-text" style={{ lineHeight: '1.8', animation: 'fadeInUp 3s ease-out' }}>
                            The StudyStream web app (beta) is now open to the public. 🎉 Boost your focus
                        </p>
                        <Button color="dark" size="lg" className="mt-4 shadow-lg hover-shadow" style={{ animation: 'bounce 2s infinite' }}>
                            GO TO APP
                        </Button>
                    </Container>
                </section>

                {/* Global Community Profiles with Hover Effects */}
                <section className="bg-white py-5">
                    <Container>
                        <h3 className="text-center mb-5 font-weight-bold">Meet Our Global Community</h3>
                        <Row className="justify-content-center">
                            {profiles.map((profile, index) => (
                                <Col key={index} xs="6" sm="4" md="3" className="text-center mb-4">
                                    <Card className="profile-card hover-shadow profile-card-hover">
                                        <img
                                            src={profile.img}
                                            alt="Profile"
                                            className="rounded-circle mb-2 moving-circle"
                                            style={{ width: '170px', height: '170px', objectFit: 'cover', border: '3px solid #ddd' }}
                                        />
                                        <CardBody>
                                            <CardTitle className="font-weight-bold">{profile.name}</CardTitle>
                                            <CardText className="font-italic">{profile.bio}</CardText>
                                            <CardText className="text-muted">{profile.country}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

                {/* Study Environment Section with Carousel */}
                <section>
                    <Container className="bg-white text-center py-5">
                        <h6>Study Session</h6>
                        <h1>Create your perfect study environment</h1>
                        <div
                            id="studyEnvironmentCarousel"
                            className="carousel slide"
                            data-ride="carousel"
                            data-interval="3000"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        className="d-block w-100"
                                        src="https://i.pinimg.com/originals/98/8f/9e/988f9eeed6ca55d516df5bda37fb7411.jpg"
                                        alt="Study Environment 1"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="https://wallpaperaccess.com/full/4521351.jpg"
                                        alt="Study Environment 2"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src="https://i.pinimg.com/originals/98/8f/9e/988f9eeed6ca55d516df5bda37fb7411.jpg"
                                        alt="Study Environment 3"
                                    />
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#studyEnvironmentCarousel"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#studyEnvironmentCarousel"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </Container>
                </section>

                {/* Motivational Quote Section */}
                <section className="bg-light py-5">
                    <Container className="text-center">
                        <blockquote className="blockquote text-center">
                            <p className="mb-0">“Success is the sum of small efforts, repeated day in and day out.”</p>
                        </blockquote>
                    </Container>
                </section>

                {/* Call to Action Section */}
                <section className="bg-dark text-white py-5">
                    <Container className="text-center">
                        <h2 className="font-weight-bold mb-4">Join Our Study Community</h2>
                        <p className="lead mb-4">Connect with thousands of students and start your focused study journey today.</p>
                        <Button color="warning" size="lg" className="mt-4 shadow-lg">
                            Join Now
                        </Button>
                    </Container>
                </section>
            </div>
        </Base>
    );
};

export default StudyStreamPage;
