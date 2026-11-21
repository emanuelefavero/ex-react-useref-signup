import { cx } from '@/lib/utils';
import './Card.css';

export const Card = ({ as: Component = 'div', className = '', ...props }) => (
  <Component className={cx('card', className)} {...props} />
);

const CardHeader = ({ as: Component = 'div', className = '', ...props }) => (
  <Component className={cx('card-header', className)} {...props} />
);

const CardTitle = ({ as: Component = 'div', className = '', ...props }) => (
  <Component
    className={cx('card-title text-xl font-semibold', className)}
    {...props}
  />
);

const CardContent = ({ as: Component = 'div', className = '', ...props }) => (
  <Component className={cx('card-content', className)} {...props} />
);

const CardImage = ({ as: Component = 'img', className = '', ...props }) => (
  <Component className={cx('card-image', className)} {...props} />
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Image = CardImage;
