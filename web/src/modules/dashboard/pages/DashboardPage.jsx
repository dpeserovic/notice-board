import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RBInput } from 'common/components';
import { RotatingLines } from 'react-loader-spinner';
import { defaultTemplate } from 'common/hoc';
import { observer } from 'mobx-react';

function DashboardPage(props) {
    const { userStore: { userRole, isUserVerified }, dashboardViewStore: { creatorViewStore, reporterViewStore, unverifiedUserViewStore, newUserViewStore } } = props;
    switch (userRole) {
        case 'creator':
            return <CreatorDashboard store={creatorViewStore} />;
        case 'reporter':
            return <ReporterDashboard store={reporterViewStore} />;
        default:
            return isUserVerified ? <NewUserDashboard store={newUserViewStore} /> : <UnverifiedUserDashboard store={unverifiedUserViewStore} />;
    }
}

const CreatorDashboard = observer(({ store }) => {
    const { rootStore: { userStore: { userAdditionalInfo: { displayName, email, dateCreated, role } }, noticeBoard: { name, description, dateCreated: noticeBoardDateCreated, code } }, loaderStore: { isLoading }, reportersCount, notificationsCount, myNotificationsCount } = store;
    return (
        <div className="text-center">
            <h1><u>My profile</u></h1>
            <ListGroup>
                <ListGroup.Item>Display name: {displayName}</ListGroup.Item>
                <ListGroup.Item>E-mail: {email}</ListGroup.Item>
                <ListGroup.Item>Date created: {new Date(dateCreated).toLocaleString(navigator.language)}</ListGroup.Item>
                <ListGroup.Item>Role: {role.toUpperCase()}</ListGroup.Item>
            </ListGroup>
            <hr />
            <h1><u>My notice board</u></h1>
            <ListGroup>
                <ListGroup.Item>Creator: {displayName}</ListGroup.Item>
                <ListGroup.Item>Name: {name}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
                <ListGroup.Item>Date created: {new Date(noticeBoardDateCreated).toLocaleString(navigator.language)}</ListGroup.Item>
                <ListGroup.Item>Code: {code}</ListGroup.Item>
                <ListGroup.Item>Number of reporters: {isLoading ? <RotatingLines strokeColor="red" strokeWidth="2.5" animationDuration="1" width="45" visible={true} /> : reportersCount}</ListGroup.Item>
                <ListGroup.Item>Number of notifications: {isLoading ? <RotatingLines strokeColor="red" strokeWidth="2.5" animationDuration="1" width="45" visible={true} /> : notificationsCount}</ListGroup.Item>
                <ListGroup.Item>Number of my notifications: {isLoading ? <RotatingLines strokeColor="red" strokeWidth="2.5" animationDuration="1" width="45" visible={true} /> : myNotificationsCount}</ListGroup.Item>
            </ListGroup>
        </div>
    )
})

const ReporterDashboard = observer(({ store }) => {
    const { rootStore: { userStore: { userAdditionalInfo: { displayName, email, dateCreated, role } }, noticeBoard: { name, description, dateCreated: noticeBoardDateCreated } }, loaderStore: { isLoading }, myNotificationsCount } = store;
    return (
        <div className="text-center">
            <h1><u>My profile</u></h1>
            <ListGroup>
                <ListGroup.Item>Display name: {displayName}</ListGroup.Item>
                <ListGroup.Item>E-mail: {email}</ListGroup.Item>
                <ListGroup.Item>Date created: {new Date(dateCreated).toLocaleString(navigator.language)}</ListGroup.Item>
                <ListGroup.Item>Role: {role.toUpperCase()}</ListGroup.Item>
            </ListGroup>
            <hr />
            <h1><u>My notice board</u></h1>
            <ListGroup>
                <ListGroup.Item>Creator: {displayName}</ListGroup.Item>
                <ListGroup.Item>Name: {name}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
                <ListGroup.Item>Date created: {new Date(noticeBoardDateCreated).toLocaleString(navigator.language)}</ListGroup.Item>
                <ListGroup.Item>Number of my notifications: {isLoading ? <RotatingLines strokeColor="red" strokeWidth="2.5" animationDuration="1" width="45" visible={true} /> : myNotificationsCount}</ListGroup.Item>
            </ListGroup>
        </div>
    )
})

const UnverifiedUserDashboard = observer(function ({ store }) {
    const { userStore: { userEmail, sendEmailVerification }, reload } = store;
    return (
        <div className="text-center">
            <h1>E-mail verification sent to {userEmail}</h1>
            <h6>If you didn't recieve e-mail click on 'Resend e-mail verification' and if you did verify e-mail click on 'Reload'</h6>
            <ListGroup>
                <ListGroup.Item><Button type="button" className="mb-3" variant="primary" onClick={sendEmailVerification}>Resend e-mail verification</Button></ListGroup.Item>
                <ListGroup.Item><Button type="button" className="mb-3" variant="secondary" onClick={reload}>Reload</Button></ListGroup.Item>
            </ListGroup>
        </div>
    )
})

const NewUserDashboard = observer(function ({ store }) {
    const { createNoticeBoardForm, joinNoticeBoardForm } = store;
    return (
        <div className="text-center">
            <Row>
                <Col>
                    <h1>Create new notice board</h1>
                    <Form>
                        {Array.from(createNoticeBoardForm.fields).map(([key, value]) => {
                            return (
                                <Row key={key} className="justify-content-md-center mb-3" md={5}>
                                    <Form.Group>
                                        <RBInput {...createNoticeBoardForm.$(key).bind()} />
                                    </Form.Group>
                                </Row>
                            )
                        })}
                        <Button type="button" className="mb-3" variant="primary" onClick={createNoticeBoardForm.onSubmit}>Create</Button>
                    </Form>
                </Col>
                <Col>
                    <h1>Join existing notice board</h1>
                    <Form>
                        {Array.from(joinNoticeBoardForm.fields).map(([key, value]) => {
                            return (
                                <Row key={key} className="justify-content-md-center mb-3" md={5}>
                                    <Form.Group>
                                        <RBInput {...joinNoticeBoardForm.$(key).bind()} />
                                    </Form.Group>
                                </Row>
                            )
                        })}
                        <Button type="button" className="mb-3" variant="primary" onClick={joinNoticeBoardForm.onSubmit}>Join</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
})

export default defaultTemplate(DashboardPage);
