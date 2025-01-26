import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import "./FocusRoomPage.css";
import Base from "../component/Base";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import { NavLink as ReactLink } from "react-router-dom";

const FocusRoomPage = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, []);

  return (
    <Base>
      <div>
        {/* Join a Focus Room Section */}
        <section className="join-focus-room">
          <Container>
            <Row className="align-items-center">
              <Col md={8} className="text-center">
                <h1 className="section-title-large">Join a Focus Room</h1>
                <p className="section-subtitle-large">
                  The <span className="highlight">#1 Platform</span> to Get Work Done
                </p>
                <p className="section-description-large">Join below, all rooms are open 24/7!</p>
              </Col>
              <Col md={4} className="text-end">
                <Row className="mb-2">
                  <Col>
                    <Button color="secondary" className="feedback-button">
                      Report an Incident
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button color="secondary" className="feedback-button">
                      Leave Feedback
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ marginTop: "40px" }}>
              <Col md={4}>
                <Card className="room-card">
                  <CardBody className="text-center">
                    {/* <h5 className="room-title">Focus Room 1</h5> */}
                    <h5
  className="room-title"
  style={{
    fontSize: "1.5rem",
    color: "#000000",
    position: "static",
    top: "20px",
    left: "40%",
    zIndex: 2,
    fontWeight: 700,
    textAlign: "center",
  }}
>
  Focus Room 1
</h5>

                    <p className="room-status">🟢 924 online</p>
                    <Button
  color="primary"
  block
  className="join-button"
  onClick={() => window.location.href = '/focusroom2'}
>
  Join
</Button>

                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="room-card">
                  <CardBody className="text-center">
                    {/* <h5 className="room-title">Focus Room 2</h5> */}
                    <h5
  className="room-title"
  style={{
    fontSize: "1.5rem",
    color: "#000000",
    position: "static",
    top: "20px",
    left: "40%",
    zIndex: 2,
    fontWeight: 700,
    textAlign: "center",
  }}
>
  Focus Room 2
</h5>
                    <p className="room-status">🟢 196 online</p>
                    <Button color="primary" block className="join-button" tag={ReactLink} to="/live">
                      Join
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="room-card">
                  <CardBody className="text-center">
                    {/* <h5 className="room-title">"Do Anything" Room</h5> */}
                    <h5
  className="room-title"
  style={{
    fontSize: "1.5rem",
    color: "#000000",
    position: "static",
    top: "20px",
    left: "40%",
    zIndex: 2,
    fontWeight: 700,
    textAlign: "center",
  }}
>
"Do Anything" Room
</h5>
                    <p className="room-status">🟢 13 online</p>
                    <p className="room-locked">🔒 Requires sign-up</p>
                    {login ? (
                      <Button color="primary" tag={ReactLink}
                      to="/doanything" block className="join-button">
                        Join
                      </Button>
                    ) : (
                      <Button color="primary" tag={ReactLink}
                      to="/login" block className="join-button">
                        Join
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Why Join a Focus Room Section */}
        <section className="why-focus-room">
          <Container>
            <h1 className="section-title">Why join a Focus Room?</h1>
            <p className="section-description">
              Looking for a place to focus and <strong>study with strangers</strong>? Try StudyStream's focus rooms.
              Open 24 hours a day — no matter what timezone or country you live in, there will always be a study room
              for you to work alongside other students.
            </p>
            <p className="section-description">
              The perfect place to boost productivity, make new friends, and be more accountable for your studies. Join
              and study with the StudyStream community today and get one step closer to achieving your goals: get
              better grades, study abroad, work abroad, and land a dream job.
            </p>
            <Row className="justify-content-center mt-3">
  <Col xs="auto">
    <Button color="primary" tag={ReactLink} to="/login">
      SEE OTHER LIVE
    </Button>
    </Col>
    </Row>
          </Container>
        </section>
       
        {/* StudyStreamers Section */}
        <section className="studyStreamers-section">
          <Container fluid className="bg-light py-5">
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <h2>We ❤️ Our StudyStreamers...</h2>
                <div className="d-flex justify-content-center my-3">
                  <i className="bi bi-tiktok mx-2"></i>
                  <i className="bi bi-instagram mx-2"></i>
                  <i className="bi bi-facebook mx-2"></i>
                  <i className="bi bi-twitter mx-2"></i>
                  <i className="bi bi-linkedin mx-2"></i>
                  <i className="bi bi-youtube mx-2"></i>
                </div>
              </Col>
            </Row>
            <Row className="text-center">
              <Col md={12}>
                <div className="card-animation-wrapper">
                  <Card className="card-animation">
                    <p>"This platform saved me."</p>
                    <p>- al. (@blewhesmind)</p>
                  </Card>
                  <Card className="card-animation">
                    <p>"I literally finished all my tasks 😂😭"</p>
                    <p>- jei7 (@geonjei)</p>
                  </Card>
                  <Card className="card-animation">
                    <p>"Yes that's right! I prefer to keep the camera on and work with others!"</p>
                    <p>- Maria Rita (@Eu_Maria)</p>
                  </Card>
                </div>
              </Col>
            </Row>
           
            <Row className="text-center">
              <Col md={12}>
                <div className="card-animation-wrapper">
                  <Card className="card-animation">
                    <p>"This platform saved me."</p>
                    <p>- al. (@blewhesmind)</p>
                  </Card>
                  <Card className="card-animation">
                    <p>"I literally finished all my tasks 😂😭"</p>
                    <p>- jei7 (@geonjei)</p>
                  </Card>
                  <Card className="card-animation">
                    <p>"Yes that's right! I prefer to keep the camera on and work with others!"</p>
                    <p>- Maria Rita (@Eu_Maria)</p>
                  </Card>
                  
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer Section */}
        <footer className="footer mt-8">
          <Row className="justify-content-center">
            <Col xs="12" className="text-center">
              <div className="footer-logo-and-link">
                <img src="https://i.ibb.co/hgrRBKh/sslogo.png" alt="Logo" className="footer-logo" style={{ width: "40px", marginRight: "10px" }} />
                <a href="#focus-room">Focus Room</a>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" className="text-center">
              <p className="footer-links">
                <a href="#how-it-works">How it works</a> | <a href="#community">Community</a> |
                <a href="#rules">Rules</a> | <a href="#blog">Blog</a> | <a href="#contact-us">Contact Us</a>
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" className="text-center">
              <p className="footer-legal">Terms & Conditions | Privacy Policy</p>
            </Col>
          </Row>
        </footer>
      </div>
    </Base>
  );
};

export default FocusRoomPage;
