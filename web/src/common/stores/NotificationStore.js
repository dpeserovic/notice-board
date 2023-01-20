import { toast } from 'react-toastify';

const TOAST_CONFIG = {
    position: 'bottom-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
}

class NotificationStore {
    showSuccessToast = (message = '', config = {}) => {
        const options = Object.assign(TOAST_CONFIG, config);
        toast.success(message, options);
    }

    showErrorToast = (message = '', config = {}) => {
        const options = Object.assign(TOAST_CONFIG, config);
        toast.error(message, options);
    }
}

export default NotificationStore;
