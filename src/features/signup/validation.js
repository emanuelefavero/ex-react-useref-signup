import { SPECIALIZATIONS } from './constants';

const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:\'\\",.<>?/`~';
const LETTER_REGEX = /[a-zA-Z]/;
const NUMBER_REGEX = /[0-9]/;
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

export const validateUsername = username => {
  if (username.length < 6) return 'Username must be at least 6 characters';

  const hasAlphanumeric = ALPHANUMERIC_REGEX.test(username);
  if (!hasAlphanumeric) return 'Username must be letters and numbers only';

  return '';
};

export const validatePassword = password => {
  if (password.length < 8) return 'Password must be at least 8 characters';

  const hasLetter = LETTER_REGEX.test(password);
  const hasNumber = NUMBER_REGEX.test(password);
  const hasSymbol = Array.from(password).some(character =>
    SYMBOLS.includes(character),
  );

  if (!hasLetter) return 'Password must contain at least 1 letter';
  if (!hasNumber) return 'Password must contain at least 1 number';
  if (!hasSymbol) return 'Password must contain at least 1 symbol';

  return '';
};

export const validateDescription = description => {
  const length = description.trim().length;

  return length < 100 || length > 1000
    ? 'Description must be between 100 and 1000 characters'
    : '';
};

export const validateForm = formData => {
  const years = Number(formData.yearsOfExperience);

  return {
    fullName: formData.fullName.trim() === '' ? 'Full Name is required' : '',
    username: validateUsername(formData.username),
    password: validatePassword(formData.password),
    specialization: !SPECIALIZATIONS.includes(formData.specialization)
      ? 'Specialization is required'
      : '',
    yearsOfExperience:
      !Number.isInteger(years) || years < 1
        ? 'Years of Experience must be at least 1'
        : '',
    description: validateDescription(formData.description),
  };
};
