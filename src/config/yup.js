import * as yup from 'yup';

const commonScheme = {
  required: yup.string().required('This is required field.'),
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  email: yup.string().email('Email must be valid.').required('Email name is required.'),
  password: yup
    .string()
    .min(6, 'Password must contain atleast 6 characters.')
    .max(12, 'Password must contain atmost 12 characters.')
    .required('Password is required.'),
  passwordConfirmation: yup
    .string()
    .min(6, 'Password must contain atleast 6 characters.')
    .max(12, 'Password must contain atmost 12 characters.')
    .required('Password is required.')
    .oneOf([yup.ref('password'), null], 'Password must match.'),
};

export const signinFormScheme = yup.object().shape({
  email: commonScheme.email,
  password: commonScheme.password,
});
export const otp = yup.object().shape({
  otp: yup.string().required('Otp is required.'),
});

export const signUpSchema = yup.object().shape({
  email: commonScheme.email,
  firstName: commonScheme.firstName,
  lastName: commonScheme.lastName,
  password: commonScheme.password,
  confirmPassword: commonScheme.passwordConfirmation,
});
export const changePasswordSchema = yup.object().shape({
  password: commonScheme.password,
  confirmPassword: commonScheme.passwordConfirmation,
});
export const forgetFormSchema = yup.object().shape({
  email: commonScheme.email,
});

export const gridSchema = yup.object().shape({
  name: commonScheme.required,
  description: commonScheme.required,
  actions: yup.array().min(1, 'At least one action must be selected').required(),
});
