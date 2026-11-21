import './Label.css';
import { cx } from '@/lib/utils';

export const Label = ({ className = '', srOnly = false, ...props }) => (
  <label className={cx('label', className, srOnly && 'sr-only')} {...props} />
);
