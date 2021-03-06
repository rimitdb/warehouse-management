import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../fireBase.init";

const NavBar = () => {

    const [user, setUser] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
            else {
                setUser({});
            }
        });
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            <p>Error: {error.message}</p>
        });

    }


    return (
        <Navbar bg="success" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="/">RIM COMPUTERS</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto my-2 my-lg-0" navbarScroll >
                        <Nav.Link className="px-2 text-light" as={Link} to="/">Home</Nav.Link>
                        <Nav.Link className="px-2 text-light" as={Link} to="/blog">Blog</Nav.Link>

                        {user?.email ? <Nav.Link className="px-2 text-light" as={Link} to="/addproduct">Add Product</Nav.Link> : ""

                        }
                        {
                            user?.email ? <Nav.Link className="px-2 text-light" as={Link} to="/manage-inventory">Manage Inventory</Nav.Link> : ""
                        }
                        {user?.uid ?
                            <button onClick={handleLogout} className='btn btn-warning'>Logout</button>
                            :
                            <Nav.Link as={Link} to="/login"><button className='btn btn-warning'>Login</button></Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;