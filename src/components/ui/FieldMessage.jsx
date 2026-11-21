import './FieldMessage.css';
import { cx } from '@/lib/utils';

const fieldMessageVariant = Object.freeze({
  default: 'default',
  danger: 'danger',
  warning: 'warning',
  success: 'success',
});

export const FieldMessage = ({
  variant = fieldMessageVariant.default,
  className = '',
  ...props
}) => (
  <p
    className={cx('field-message', variant, className)}
    aria-live='polite'
    aria-atomic='true'
    {...props}
  />
);

FieldMessage.variant = fieldMessageVariant;
