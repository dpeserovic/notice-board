import MobxReactForm from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

function createForm({ fields, hooks }) {
    const instance = new MobxReactForm({ fields }, { plugins: { dvr: dvr(validatorjs) }, hooks });
    return instance;
}

export default createForm;
