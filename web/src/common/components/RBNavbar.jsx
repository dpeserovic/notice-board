import React from 'react';
import { defaultTemplate } from 'common/hoc';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { BsPower } from 'react-icons/bs';
import { RBNavbarMenu } from './';

function RBNavbar({ userStore: { isLoggedIn, userRole, userEmail, logout } }) {
    return (
        <Navbar className="mb-3" expand={false}>
            <Container fluid>
                <Navbar.Brand>Notice Board</Navbar.Brand>
                {isLoggedIn ?
                    userRole != null && userRole ?
                        <>
                            <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
                            <Navbar.Offcanvas id="offcanvasNavbar-expand" aria-labelledby="offcanvasNavbarLabel-expand" placement="end">
                                <RBNavbarMenu />
                            </Navbar.Offcanvas>
                        </>
                        :
                        <Navbar.Brand>{userEmail} <button type="button" onClick={logout} className="btn-icon btn-icon-danger"><BsPower /></button></Navbar.Brand>
                    :
                    null}
            </Container>
        </Navbar>
    );
}

export default defaultTemplate(RBNavbar);
