import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { RBInput } from 'common/components';
import { defaultTemplate } from 'common/hoc';

function PasswordResetPage(props) {
    const { membershipModuleStore: { passwordResetViewStore: { passwordResetForm, goToLogin } } } = props;
    return (
        <div className="text-center">
            <h1>Password reset</h1>
            <Form>
                {Array.from(passwordResetForm.fields).map(([key, value]) => {
                    return (
                        <Row key={key} className="justify-content-md-center mb-3" md={5}>
                            <Form.Group>
                                <RBInput {...passwordResetForm.$(key).bind()} />
                            </Form.Group>
                        </Row>
                    )
                })}
                <Button type="button" className="mb-3" variant="primary" onClick={passwordResetForm.onSubmit}>Send password reset email</Button>
            </Form>
            <Button type="button" variant="secondary" onClick={goToLogin}>Go to Login</Button>
        </div>
    );
}

export default defaultTemplate(PasswordResetPage);
