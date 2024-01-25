import Link from 'next/link';

import styles from './Button.module.css';

function Button(props) {
  // variant = contained, outlined, text
  // color = primary, seconday, danger

  const {
    action,
    href,
    to,
    link,
    children,
    disabled = false,
    className = '',
    startsWith = '',
    endsWith = '',
    variant = 'contained',
    color = 'primary',
    ...other
  } = props;

  let disabledClass = disabled ? 'disabled' : '';

  return (
    <Link
      href={href || link || to || action}
      disabled={disabled}
      className={`${styles.btn} ${styles[variant]} ${styles[color]} ${disabledClass} ${className}`}
      {...other}
    >
      {startsWith && <span className={styles.icon}>{startsWith}</span>}
      <span>{props.children}</span>
      {endsWith && <span className={styles.icon}>{endsWith}</span>}
    </Link>
  );
}

export default Button;
