import { useState } from 'react';
import { Button } from './ui/Button';
import { FieldMessage } from './ui/FieldMessage';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import './SignupForm.css';

const SPECIALIZATIONS = ['Full Stack', 'Frontend', 'Backend'];
const INITIAL_FORM_DATA = {
  fullName: '',
  username: '',
  password: '',
  specialization: '',
  yearsOfExperience: '1',
  description: '',
};

const validateForm = formData => {
  const years = Number(formData.yearsOfExperience);

  return {
    fullName: formData.fullName.trim() === '' ? 'Full Name is required' : '',
    username: formData.username.trim() === '' ? 'Username is required' : '',
    password: formData.password.trim() === '' ? 'Password is required' : '',
    specialization: !SPECIALIZATIONS.includes(formData.specialization)
      ? 'Specialization is required'
      : '',
    yearsOfExperience:
      !Number.isInteger(years) || years < 1
        ? 'Years of Experience must be at least 1'
        : '',
    description:
      formData.description.trim() === '' ? 'Description is required' : '',
  };
};

export const SignupForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);

    if (hasErrors) return;

    console.log('formData:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <div className='form-field'>
        <Label htmlFor='fullName'>Full Name</Label>
        <Input
          id='fullName'
          name='fullName'
          placeholder='John Doe'
          value={formData.fullName}
          onChange={handleChange}
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
          variant={FieldMessage.variant.danger}
        >
          {errors.username}
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
          variant={FieldMessage.variant.danger}
        >
          {errors.password}
        </FieldMessage>
      </div>

      <div className='form-field'>
        <Label htmlFor='specialization'>Specialization</Label>
        <Select
          id='specialization'
          name='specialization'
          value={formData.specialization}
          onChange={handleChange}
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
          value={formData.yearsOfExperience}
          onChange={handleChange}
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
          variant={FieldMessage.variant.danger}
        >
          {errors.description}
        </FieldMessage>
      </div>

      <div className='form-field'>
        <Button type='submit'>Sign Up</Button>
      </div>
    </form>
  );
};
