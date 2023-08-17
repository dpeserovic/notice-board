import React from 'react';
import { defaultTemplate } from 'common/hoc';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { RBNavbarMenu } from './';

function RBNavbar({ userStore: { userRole } }) {
    return (
        <Navbar className="mb-3" expand={false}>
            <Container fluid>
                <Navbar.Brand>Notice Board</Navbar.Brand>
                {userRole != null ?
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
