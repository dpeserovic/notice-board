import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { RBInput } from 'common/components';
import { defaultTemplate } from 'common/hoc';

function LoginPage(props) {
    const { membershipModuleStore: { loginViewStore: { loginForm, goToRegister } } } = props;
    return (
        <div className="center">
            <h1>Login</h1>
            <Form>
                {Array.from(loginForm.fields).map(([key, value]) => {
                    return (
                        <Row key={key} className="justify-content-md-center mb-3" md={5}>
                            <Form.Group>
                                <RBInput {...loginForm.$(key).bind()} />
                            </Form.Group>
                        </Row>
                    )
                })}
                <Button type="button" className="mb-3" variant="danger" onClick={loginForm.onSubmit}>Log in</Button>
            </Form>
            <Button type="button" variant="warning" onClick={goToRegister}>Don't have an account? Register</Button>
        </div>
    );
}

export default defaultTemplate(LoginPage);
