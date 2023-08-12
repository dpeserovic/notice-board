import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RBInput } from 'common/components';
import { defaultTemplate } from 'common/hoc';
import { observer } from 'mobx-react';

function DashboardPage(props) {
    const { userStore: { userRole } } = props;
    switch (userRole) {
        case 'creator':
            return <CreatorDashboard {...props} />
        case 'reporter':
            return <ReporterDashboard {...props} />
        default:
            return <NewUserDashboard {...props} />;
    }
}

function CreatorDashboard(props) {
    return <span>CreatorDashboard</span>
}

function ReporterDashboard(props) {
    return <span>ReporterDashboard</span>
}

const NewUserDashboard = observer(function (props) {
    const { dashboardViewStore: { createNoticeBoardForm, joinNoticeBoardForm } } = props;
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
