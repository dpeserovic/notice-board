import React from 'react';
import { defaultTemplate } from 'common/hoc';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';

function RBNavbarMenu() {
    return (
        <>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                    Notice Board
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link>Page 1</Nav.Link>
                    <Nav.Link>Page 2</Nav.Link>
                    <Nav.Link>Page 3</Nav.Link>
                    <Nav.Link>Page 4</Nav.Link>
                    <Nav.Link>Page 5</Nav.Link>
                    <Nav.Link>Page 6</Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </>
    );
}

export default defaultTemplate(RBNavbarMenu);
