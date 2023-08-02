const createNewNoticeBoardFormFields = rootStore => {
    const { userStore: { user: { uid } } } = rootStore;
    return (
        [{
            name: 'creatorId',
            value: uid,
            type: 'hidden',
            rules: 'required',
        },
        {
            name: 'name',
            label: 'Name',
            placeholder: 'Enter name',
            type: 'text',
            rules: 'required|string|between:5,25',
        },
        {
            name: 'description',
            label: 'Description',
            placeholder: 'Enter description',
            type: 'text',
            rules: 'required|string|between:5,50',
        },
        {
            name: 'code',
            value: uid.slice(0, 5).toLowerCase(),
            type: 'hidden',
            rules: 'required',
        },]
    );
}
export default createNewNoticeBoardFormFields;
