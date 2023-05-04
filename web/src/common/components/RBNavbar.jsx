import React from 'react';
import { defaultTemplate } from 'common/hoc';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { RBNavbarMenu } from './';

function RBNavbar({ authStore: { isLoggedIn } }) {
    return (
        <Navbar className="mb-3" bg="danger" variant="dark" expand={false}>
            <Container fluid>
                <Navbar.Brand>Notice Board</Navbar.Brand>
                {isLoggedIn ?
                    <>
                        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
                        <Navbar.Offcanvas id="offcanvasNavbar-expand" aria-labelledby="offcanvasNavbarLabel-expand" placement="end">
                            <RBNavbarMenu />
                        </Navbar.Offcanvas>
                    </>
                    :
                    null}
            </Container>
        </Navbar>
    );
}

export default defaultTemplate(RBNavbar);
