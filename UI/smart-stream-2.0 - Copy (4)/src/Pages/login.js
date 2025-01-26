import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Spinner, InputGroup, InputGroupText } from "reactstrap";
import { toast } from "react-toastify";
import { AiOutlineUser, AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import userContext from "../Context/userContext";
import { doLogin } from "../auth";
import { loginUser } from "../Service/User-service";
import Base from "../component/Base";

const Login = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleChange = (event, field) => {
    const actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (loginDetail.userName.trim() === "" || loginDetail.password.trim() === "") {
      toast.error("Username or password is required");
      return;
    }

    setLoading(true);

    loginUser(loginDetail)
      .then((data) => {
        doLogin(data, () => {
          userContextData.setUser({
            data: data.user,
            login: true,
          });
          navigate("/documents");
        });
        toast.success("Login successful");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && (error.response.status === 400 || error.response.status === 404)) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on the server");
        }
      });
  };

  const handleReset = () => {
    setLoginDetail({
      userName: "",
      password: "",
    });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card
              className="shadow-lg"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                border: "none",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
                <h3 className="text-center" style={{ color: "#333", fontWeight: "500" }}>
                  Login to Your Account
                </h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Username field */}
                  <FormGroup>
                    <Label for="userName" style={{ color: "#555", fontSize: "14px" }}>
                      Username
                    </Label>
                    <div className="input-group">
                      <InputGroupText style={{ backgroundColor: "#f4f4f4", border: "1px solid #ddd" }}>
                        <AiOutlineUser style={{ color: "#555" }} />
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder="Enter username"
                        id="userName"
                        value={loginDetail.userName}
                        onChange={(e) => handleChange(e, "userName")}
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          color: "#333",
                          fontSize: "14px",
                        }}
                        className="hover-input"
                        aria-label="Username"
                      />
                    </div>
                  </FormGroup>

                  {/* Password field with Show/Hide icon inside */}
                  <FormGroup>
                    <Label for="password" style={{ color: "#555", fontSize: "14px" }}>
                      Password
                    </Label>
                    <InputGroup>
                      <InputGroupText style={{ backgroundColor: "#f4f4f4", border: "1px solid #ddd" }}>
                        <AiOutlineLock style={{ color: "#555" }} />
                      </InputGroupText>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        id="password"
                        value={loginDetail.password}
                        onChange={(e) => handleChange(e, "password")}
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          color: "#333",
                          fontSize: "14px",
                        }}
                        className="hover-input"
                        aria-label="Password"
                      />
                      <InputGroupText
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#f4f4f4",
                          borderLeft: "1px solid #ddd",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>

                  <Container className="text-center">
                    <Button
                      color="primary"
                      type="submit"
                      disabled={loading}
                      className="me-2 hover-button"
                      style={{
                        backgroundColor: "#007bff",
                        border: "none",
                        color: "white",
                        fontWeight: "bold",
                        padding: "10px 20px",
                      }}
                    >
                      {loading ? <Spinner size="sm" /> : "Login"}
                    </Button>
                    <Button
                      color="secondary"
                      onClick={handleReset}
                      className="hover-button"
                      style={{
                        backgroundColor: "#6c757d",
                        border: "none",
                        color: "white",
                        fontWeight: "bold",
                        padding: "10px 20px",
                      }}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>

                {/* "Create an Account" button */}
                <div className="text-center mt-4">
                  <Button
                    color="success"
                    onClick={() => navigate("/signup")}
                    className="hover-button"
                    style={{
                      backgroundColor: "#28a745",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                    }}
                  >
                    Create an Account
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Add custom styles */}
      <style>
        {`
          .hover-button:hover {
            background-color: #0056b3 !important;
            color: white !important;
            transition: background-color 0.3s ease-in-out;
          }
          .hover-input:hover {
            border-color: #007bff !important;
            transition: border-color 0.3s ease-in-out;
          }
          .hover-button:focus {
            outline: none !important;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
          }
          .input-group-text {
            border-radius: 0.25rem;
          }
        `}
      </style>
    </Base>
  );
};

export default Login;
