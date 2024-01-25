import Link from 'next/link';

import styles from './Button.module.css';

export default function Button(props) {
  const {
    action,
    href,
    to,
    link,
    children,
    disabled = false,
    className = '',
    variant = 'contained',
    color = 'primary',
    ...other
  } = props;

  // variant = contained, outlined, text
  // color = primary, seconday, danger

  let disabledClass = disabled ? styles.disabled : '';

  return (
    <Link
      href={href || link || to || action}
      disabled={disabled}
      className={`${styles.btn} ${styles[variant]} ${styles[color]} ${disabledClass} ${className}`}
      {...other}
    >
      {props.children}
    </Link>
  );
}
