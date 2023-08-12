const notificationFormFields = (rootStore, notification) => {
    const { userStore: { user: { uid } } } = rootStore;
    return (
        [{
            name: 'authorId',
            value: notification != null ? notification.authorId : uid,
            type: 'hidden',
            rules: 'required',
        },
        {
            name: 'title',
            value: notification != null ? notification.title : '',
            label: 'Title',
            placeholder: 'Enter title',
            type: 'text',
            rules: 'required|string|between:5,25',
        },
        {
            name: 'text',
            value: notification != null ? notification.text : '',
            label: 'Text',
            placeholder: 'Enter text',
            type: 'text',
            rules: 'required|string|between:5,50',
        },]
    );
}
export default notificationFormFields;
