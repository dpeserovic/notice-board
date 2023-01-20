import React from 'react';
import Form from 'react-bootstrap/Form';
import { observer } from 'mobx-react';

function RBInput({ label, ...rest }) {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control {...rest} />
        </Form.Group>
    );
}

export default observer(RBInput);
