import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { RBInput } from 'common/components';
import { defaultTemplate } from 'common/hoc';

function LoginPage(props) {
    const { membershipModuleStore: { loginViewStore: { loginForm, goToRegister, goToPasswordReset } } } = props;
    return (
        <div className="text-center">
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
                <Button type="button" className="mb-3" variant="primary" onClick={loginForm.onSubmit}>Log in</Button>
            </Form>
            <ButtonGroup vertical>
                <Button type="button" variant="secondary" onClick={goToRegister}>Don't have an account? Register</Button>
                <Button type="button" variant="secondary" onClick={goToPasswordReset}>Forgot password? Reset</Button>
            </ButtonGroup>
        </div>
    );
}

export default defaultTemplate(LoginPage);
