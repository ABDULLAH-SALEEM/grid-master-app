import { toast } from 'react-toastify';

export const constants = {
  authToken: 'token',
  pending: 'PENDING',
  joined: 'JOINED',
  languageKey: 'FRENCH',
  notificationToken: 'notificationToken',
};
export const OTP_VERIFICATION_MODE = {
  NEW_USER: 'NEW_USER',
  JOIN_USER: 'JOIN_USER',
  ACCOUNT_RECOVERY: 'ACCOUNT_RECOVERY',
  LOGIN: 'LOGIN',
};

export const showSuccessTost = (msg) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showErrorTost = (msg) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
