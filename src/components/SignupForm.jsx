import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { FieldMessage } from './ui/FieldMessage';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import './SignupForm.css';

const SPECIALIZATIONS = ['Full Stack', 'Frontend', 'Backend'];

const INITIAL_FORM_DATA = {
  username: '',
  password: '',
  description: '',
};

const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:\'\\",.<>?/`~';
const LETTER_REGEX = /[a-zA-Z]/;
const NUMBER_REGEX = /[0-9]/;
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

const validateUsername = username => {
  if (username.length < 6) return 'Username must be at least 6 characters';

  const hasAlphanumeric = ALPHANUMERIC_REGEX.test(username);
  if (!hasAlphanumeric) return 'Username must be letters and numbers only';

  return '';
};

const validatePassword = password => {
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

const validateDescription = description => {
  const length = description.trim().length;

  return length < 100 || length > 1000
    ? 'Description must be between 100 and 1000 characters'
    : '';
};

const validateForm = formData => {
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

const focusAndScrollToTop = form => {
  form?.elements.namedItem('fullName').focus({ preventScroll: true });
  form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const SignupForm = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submitErrors, setSubmitErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({}); // show live validation errors only for touched fields

  const liveErrors = {
    username: touchedFields.username ? validateUsername(formData.username) : '',
    password: touchedFields.password ? validatePassword(formData.password) : '',
    description: touchedFields.description
      ? validateDescription(formData.description)
      : '',
  };

  const errors = {
    ...submitErrors,
    ...liveErrors,
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setTouchedFields(prevFields => ({ ...prevFields, [name]: true }));

    setSubmitErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const fields = formRef.current?.elements; // Get all form fields from ref

    // Collect all form data including fields not managed by formData state
    const data = {
      ...formData,
      fullName: fields.namedItem('fullName').value,
      specialization: fields.namedItem('specialization').value,
      yearsOfExperience: fields.namedItem('yearsOfExperience').value,
    };

    setTouchedFields({ username: true, password: true, description: true });

    const validationErrors = validateForm(data);
    setSubmitErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);

    if (hasErrors) return;

    console.log('formData:', data);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmitErrors({});
    setTouchedFields({});
    const form = formRef.current;
    form?.reset();
    focusAndScrollToTop(form);
  };

  const handleScrollToTop = () => {
    const form = formRef.current;
    focusAndScrollToTop(form);
  };

  useEffect(() => {
    focusAndScrollToTop(formRef.current);
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='signup-form'>
      <div className='form-field'>
        <Label htmlFor='fullName'>Full Name</Label>
        <Input
          id='fullName'
          name='fullName'
          placeholder='John Doe'
          defaultValue=''
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby='fullName-message'
        />
        <FieldMessage
          id='fullName-message'
          variant={FieldMessage.variant.danger}
        >
          {errors.fullName}
        </FieldMessage>
      </div>

      <div className='form-field'>
        <Label htmlFor='username'>Username</Label>
        <Input
          id='username'
          name='username'
          placeholder='johndoe123'
          value={formData.username}
          onChange={handleChange}
          aria-invalid={Boolean(errors.username)}
          aria-describedby='username-message'
        />

        <FieldMessage
          id='username-message'
          variant={
            errors.username
              ? FieldMessage.variant.danger
              : FieldMessage.variant.success
          }
        >
          {touchedFields.username && (errors.username || 'Username is valid')}
        </FieldMessage>
      </div>

      <div className='form-field'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          placeholder='********'
          value={formData.password}
          onChange={handleChange}
          aria-invalid={Boolean(errors.password)}
          aria-describedby='password-message'
        />
        <FieldMessage
          id='password-message'
          variant={
            errors.password
              ? FieldMessage.variant.danger
              : FieldMessage.variant.success
          }
        >
          {touchedFields.password && (errors.password || 'Password is valid')}
        </FieldMessage>
      </div>

      <div className='form-field'>
        <Label htmlFor='specialization'>Specialization</Label>
        <Select
          id='specialization'
          name='specialization'
          defaultValue=''
          aria-invalid={Boolean(errors.specialization)}
          aria-describedby='specialization-message'
        >
          <option value=''>Select specialization</option>
          {SPECIALIZATIONS.map(spec => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </Select>
        <FieldMessage
          id='specialization-message'
          variant={FieldMessage.variant.danger}
        >
          {errors.specialization}
        </FieldMessage>
      </div>

      <div className='form-field'>
        <Label htmlFor='yearsOfExperience'>Years of Experience</Label>
        <Input
          id='yearsOfExperience'
          name='yearsOfExperience'
          type='number'
          min={1}
          step={1}
          defaultValue='1'
          aria-invalid={Boolean(errors.yearsOfExperience)}
          aria-describedby='yearsOfExperience-message'
        />
        <FieldMessage
          id='yearsOfExperience-message'
          variant={FieldMessage.variant.danger}
        >
          {errors.yearsOfExperience}
        </FieldMessage>
      </div>

      <div className='form-field'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          name='description'
          placeholder='Tell us about yourself'
          value={formData.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby='description-message'
        />
        <FieldMessage
          id='description-message'
          variant={
            errors.description
              ? FieldMessage.variant.danger
              : FieldMessage.variant.success
          }
        >
          {touchedFields.description &&
            (errors.description || 'Description is valid')}
        </FieldMessage>
      </div>

      <div className='form-field buttons'>
        <Button variant={Button.variant.ghost} onClick={handleReset}>
          Reset
        </Button>
        <Button type='submit'>Sign Up</Button>
      </div>

      <Button
        variant={Button.variant.ghost}
        onClick={handleScrollToTop}
        className='scroll-to-top'
        aria-label='Scroll to top'
      >
        <ArrowUp size={16} aria-hidden='true' />
      </Button>
    </form>
  );
};
