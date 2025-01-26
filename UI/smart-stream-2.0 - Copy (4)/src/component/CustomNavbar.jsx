import React, { useState, useEffect, useContext } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../Context/userContext";

const CustomNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const userContextData = useContext(userContext); // Accessing userContext

    useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getCurrentUserDetail());
    }, [login]);

    const toggle = () => setIsOpen(!isOpen);

    const logout = () => {
        doLogout(() => {
            setLogin(false);
            userContextData.setUser({
                data: null,
                login: false,
            });
            navigate("/"); // Redirect to home after logout
        });
    };

    return (
        <div style={{ position: "sticky", top: "0", zIndex: "1000", width: "100%" }}>
            <Navbar
                expand="md"
                className="px-5"
                style={{ backgroundColor: "rgba(204,204,204,0.56)", backdropFilter: "blur(40px)" }}
            >
                <NavbarBrand tag={ReactLink} to="/">
                    <img
                        alt="Smart Stream"
                        // src="sslogo.png" // Add your logo URL here
                        src="https://i.ibb.co/hgrRBKh/sslogo.png" // Add your logo URL here
                        style={{
                            height: 50,
                            width: 180,
                        }}
                    />
                </NavbarBrand>

                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/focus">
                                Focus Room
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/class">
                                StudySpace
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/stream">
                                Stream
                            </NavLink>
                            
                        </NavItem>
                       

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                        Twitter
                                    </a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                        Facebook
                                    </a>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                        YouTube
                                    </a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                        Instagram
                                    </a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                        LinkedIn
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                    {/* Right Section */}
                    <Nav className="ms-auto" navbar>
                        {login ? (
                            <>
                               
                                <NavItem>
                                    {/* Logout as NavLink */}
                                    <NavLink onClick={logout} style={{ cursor: 'pointer' }}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={ReactLink} to="/documents" className="ms-2">
                                        {user?.username}
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <NavItem>
                                <Button
                                    tag={ReactLink}
                                    to="/login"
                                    color="primary"
                                    className="ms-2"
                                    style={{
                                        fontWeight: "bold",
                                        
                                    }}
                                >
                                    SEE OTHER LIVE
                                </Button>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;
