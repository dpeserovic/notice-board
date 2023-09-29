const loginFormFields = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter Email',
        type: 'text',
        rules: 'required|email|string|between:1,100',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter Password',
        type: 'password',
        rules: 'required|string|between:5,25',
    },
];

export default loginFormFields;
