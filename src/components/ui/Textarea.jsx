import './Textarea.css';
import { cx } from '@/lib/utils';

export const Textarea = ({ className = '', ...props }) => (
  <textarea className={cx('textarea', className)} {...props} />
);
