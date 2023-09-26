import React from 'react';
import { observer } from 'mobx-react';
import { defaultTemplate } from 'common/hoc';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { RBInput } from 'common/components';

function NotificationManagement({ notificationManagementViewStore: { notifications }, notificationModalViewStore }) {
    return (
        <>
            <RBNotificationTable items={notifications} openModal={notificationModalViewStore.openModal} deleteNotification={notificationModalViewStore.deleteResource} />
            {notificationModalViewStore.notificationForm != null ? <NotificationModal store={notificationModalViewStore} /> : null}
        </>
    );
}

const RBNotificationTable = observer(function ({ items, openModal, deleteNotification }) {
    return (
        <Table className="action-table text-center">
            <thead>
                <tr>
                    <th colSpan="4"></th>
                    <th><Button type="button" className="create-new" variant="secondary" onClick={() => openModal(null)}>Create new</Button></th>
                </tr>
                <tr>
                    <th>Title</th>
                    <th>Text</th>
                    <th>Author</th>
                    <th>Date created</th>
                    <th><i>EDIT</i></th>
                    <th><i>DELETE</i></th>
                </tr>
            </thead>
            <tbody>
                {items != null ? items.map(i => <NotificationRow key={i.id} item={i} openModal={openModal} deleteNotification={deleteNotification} />) : null}
            </tbody>
        </Table>
    )
});

const NotificationRow = observer(function ({ item: { id, text, title, author, dateCreated }, openModal, deleteNotification }) {
    return (
        <tr>
            <td>{title}</td>
            <td>{text}</td>
            <td>{author}</td>
            <td>{new Date(dateCreated).toLocaleString(navigator.language)}</td>
            <td onClick={() => openModal(id)}><AiFillEdit className="icon" /></td>
            <td onClick={() => deleteNotification(id)}><AiFillDelete className="icon" /></td>
        </tr>
    )
});

const NotificationModal = observer(function ({ store }) {
    const { isOpen, notificationForm, closeModal, dispose } = store;
    return (
        <Modal show={isOpen} onHide={dispose}>
            <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <RBInput {...notificationForm.$('authorId').bind()} />
                    <Row className="justify-content-md-center mb-1" md={1}>
                        <Form.Group>
                            <RBInput {...notificationForm.$('title').bind()} />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-md-center mb-1" md={1}>
                        <Form.Group>
                            <RBInput as="textarea" rows={5} {...notificationForm.$('text').bind()} />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={notificationForm.onSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default defaultTemplate(NotificationManagement);
