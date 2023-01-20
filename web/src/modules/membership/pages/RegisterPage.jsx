import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { RBInput } from 'common/components';
import { defaultTemplate } from 'common/hoc';

function RegisterPage(props) {
    const { membershipModuleStore: { registerViewStore: { registerForm, goToLogin } } } = props;
    return (
        <div className="center">
            <h1>Register</h1>
            <Form>
                {Array.from(registerForm.fields).map(([key, value]) => {
                    return (
                        <Row key={key} className="justify-content-md-center mb-3" md={5}>
                            <Form.Group>
                                <RBInput {...registerForm.$(key).bind()} />
                            </Form.Group>
                        </Row>
                    )
                })}
                <Button type="button" className="mb-3" variant="danger" onClick={registerForm.onSubmit}>Sign up</Button>
            </Form>
            <Button type="button" variant="warning" onClick={goToLogin}>Have an account? Log in</Button>
        </div>
    );
}

export default defaultTemplate(RegisterPage);
