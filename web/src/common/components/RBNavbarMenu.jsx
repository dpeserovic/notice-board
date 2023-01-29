import React from 'react';
import { defaultTemplate } from 'common/hoc';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';

function RBNavbarMenu({ menuStore: { menu }, routerStore: { goTo } }) {
    return (
        <>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                    Notice Board
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    {menu.map(m => <Nav.Link key={m.route} onClick={() => goTo(m.route)}>{m.name}</Nav.Link>)}
                </Nav>
            </Offcanvas.Body>
        </>
    );
}

export default defaultTemplate(RBNavbarMenu);
