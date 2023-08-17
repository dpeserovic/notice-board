import React from 'react';
import { defaultTemplate } from 'common/hoc';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsPower } from 'react-icons/bs';
import Nav from 'react-bootstrap/Nav';

function RBNavbarMenu({ userStore: { userDisplayName, logout }, menuStore: { menu }, routerStore: { goTo } }) {
    return (
        <>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                    <span>{userDisplayName} <button type="button" onClick={logout} className="btn-icon btn-icon-danger"><BsPower /></button></span>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    {menu.map(m => <Nav.Link className="text-center" key={m.route} onClick={() => goTo(m.route)}>{m.name}</Nav.Link>)}
                </Nav>
            </Offcanvas.Body>
        </>
    );
}

export default defaultTemplate(RBNavbarMenu);
