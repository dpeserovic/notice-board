const passwordResetFormFields = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter Email',
        type: 'text',
        rules: 'required|email|string|between:5,25',
    },
];

export default passwordResetFormFields;
