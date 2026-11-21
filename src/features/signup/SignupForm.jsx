import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FieldMessage } from '@/components/ui/FieldMessage';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { SPECIALIZATIONS } from './constants';
import {
  validateDescription,
  validateForm,
  validatePassword,
  validateUsername,
} from './validation';
import './SignupForm.css';

const INITIAL_FORM_DATA = {
  username: '',
  password: '',
  description: '',
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
