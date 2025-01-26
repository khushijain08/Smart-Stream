import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Container, FormGroup, Input, Label, Form, Button, Row, Col, FormFeedback, Spinner, CustomInput } from "reactstrap";
import { toast } from "react-toastify";
import Base from "../component/Base";
import { signup } from "../Service/User-service";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendarAlt, FaFlag, FaMale, FaFemale, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const Signup = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    contact: '',
    dob: '',
    country: '',
    gender: '',
    category: '',
    termsAccepted: false,
  });

  const [error, setError] = useState({
    errors: {},
    isError: false
  });

  const [loading, setLoading] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setData({ ...data, termsAccepted: event.target.checked });
  };

  const resetData = () => {
    setData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      contact: '',
      dob: '',
      country: '',
      gender: '',
      category: '',
      termsAccepted: false,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (error.isError) {
      toast.error("Form data is invalid, correct all details and submit");
      setError({ ...error, isError: false });
      return;
    }

    setLoading(true);
    signup(data)
      .then((resp) => {
        toast.success("User is registered successfully !! user id " + resp.id);
        resetData();
        window.location.href = "/login";
      })
      .catch((error) => {
        setError({
          errors: error,
          isError: true,
        });
        setLoading(false);
      });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setData({ ...data, password });

    // Simple password strength check (can be improved with regex for more sophisticated checks)
    if (password.length < 6) {
      setPasswordStrength('Weak');
    } else if (password.length >= 6 && password.length < 12) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Strong');
    }
  };

  const countries = ["USA", "Canada", "UK", "Australia", "India", "Germany", "France", "Italy", "Spain", "Japan"];
  const categories = ["Student", "Teacher"];

  return (
    <Base>
      <Container>
        <Row className="mt-5">
          <Col sm={{ size: 8, offset: 2 }}>
            <Card outline className="shadow-lg p-5 mb-5 rounded" style={{ backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
              <CardHeader style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #e2e2e2' }}>
                <h3 className="text-center" style={{ fontWeight: '600', fontSize: '28px', color: '#444' }}>Create Your Account</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  {/* First Name */}
                  <FormGroup className="mb-3">
                    <Label for="firstName">First Name</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaUser /></span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        id="firstName"
                        onChange={(e) => handleChange(e, "firstName")}
                        value={data.firstName}
                        invalid={error.errors?.response?.data?.firstName ? true : false}
                      />
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.firstName}</FormFeedback>
                  </FormGroup>

                  {/* Last Name */}
                  <FormGroup className="mb-3">
                    <Label for="lastName">Last Name</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaUser /></span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        id="lastName"
                        onChange={(e) => handleChange(e, "lastName")}
                        value={data.lastName}
                        invalid={error.errors?.response?.data?.lastName ? true : false}
                      />
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.lastName}</FormFeedback>
                  </FormGroup>

                  {/* Username */}
                  <FormGroup className="mb-3">
                    <Label for="username">Username</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaQuestionCircle /></span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Choose a username"
                        id="username"
                        onChange={(e) => handleChange(e, "username")}
                        value={data.username}
                        invalid={error.errors?.response?.data?.username ? true : false}
                      />
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.username}</FormFeedback>
                  </FormGroup>

                  {/* Email */}
                  <FormGroup className="mb-3">
                    <Label for="email">Email</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaEnvelope /></span>
                      </div>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                        invalid={error.errors?.response?.data?.email ? true : false}
                      />
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>
                  </FormGroup>

                  {/* Password */}
                  <FormGroup className="mb-3">
                    <Label for="password">Password</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaLock /></span>
                      </div>
                      <Input
                        type="password"
                        placeholder="Choose a password"
                        id="password"
                        onChange={handlePasswordChange}
                        value={data.password}
                        invalid={error.errors?.response?.data?.password ? true : false}
                      />
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>
                    <div className="mt-2">
                      <small>Password Strength: <span style={{ color: passwordStrength === 'Weak' ? 'red' : passwordStrength === 'Medium' ? 'orange' : 'green' }}>{passwordStrength}</span></small>
                    </div>
                  </FormGroup>

                  {/* Contact */}
                  <FormGroup className="mb-3">
                    <Label for="contact">Contact</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaPhone /></span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter your contact number"
                        id="contact"
                        onChange={(e) => handleChange(e, "contact")}
                        value={data.contact}
                        invalid={error.errors?.response?.data?.contact ? true : false}
                      />
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.contact}</FormFeedback>
                  </FormGroup>

                  {/* Date of Birth */}
                  <FormGroup className="mb-3">
                    <Label for="dob">Date of Birth</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaCalendarAlt /></span>
                      </div>
                      <Input
                        type="date"
                        id="dob"
                        onChange={(e) => handleChange(e, "dob")}
                        value={data.dob}
                        invalid={error.errors?.response?.data?.dob ? true : false}
                      />
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.dob}</FormFeedback>
                  </FormGroup>

                  {/* Country */}
                  <FormGroup className="mb-3">
                    <Label for="country">Country</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaFlag /></span>
                      </div>
                      <Input
                        type="select"
                        id="country"
                        onChange={(e) => handleChange(e, "country")}
                        value={data.country}
                      >
                        {countries.map((country, index) => (
                          <option key={index} value={country}>{country}</option>
                        ))}
                      </Input>
                    </div>
                  </FormGroup>

                  {/* Gender */}
                  <FormGroup className="mb-3">
                    <Label for="gender">Gender</Label>
                    <div>
                      <Input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        onChange={(e) => handleChange(e, "gender")}
                        checked={data.gender === "Male"}
                      /> <FaMale /> Male
                      <Input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        onChange={(e) => handleChange(e, "gender")}
                        checked={data.gender === "Female"}
                      /> <FaFemale /> Female

                      
                    </div>
                    <FormFeedback>{error.errors?.response?.data?.gender}</FormFeedback>
                  </FormGroup>

                  {/* Category */}
                  <FormGroup className="mb-3">
                    <Label for="category">Category</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white"><FaQuestionCircle /></span>
                      </div>
                      <Input
                        type="select"
                        id="category"
                        onChange={(e) => handleChange(e, "category")}
                        value={data.category}
                      >
                        {categories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </Input>
                    </div>
                  </FormGroup>

                  {/* Terms and Conditions */}
                  <FormGroup check className="mb-3">
                    <Label check>
                      <Input
                        type="checkbox"
                        id="termsAccepted"
                        onChange={handleCheckboxChange}
                        checked={data.termsAccepted}
                      />{" "}
                      I agree to the <a href="/terms">Terms and Conditions</a>
                    </Label>
                    <FormFeedback>{!data.termsAccepted && "You must accept the terms and conditions."}</FormFeedback>
                  </FormGroup>

                  {/* Submit Button */}
                  <Button color="primary" block disabled={loading} type="submit">
                    {loading ? <Spinner size="sm" /> : 'SignUp'}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
