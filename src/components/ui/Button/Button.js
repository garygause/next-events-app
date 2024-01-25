import Link from 'next/link';

import styles from './Button.module.css';

function Button(props) {
  // variant = contained, outlined, text
  // color = primary, seconday, danger
  // need to support size
  const {
    href,
    children,
    disabled = false,
    classes = '',
    startIcon = '',
    endIcon = '',
    variant = 'contained',
    color = 'primary',
    ...other
  } = props;

  const disabledClass = disabled ? 'disabled' : '';

  if (href) {
    return (
      <Link
        href={href}
        disabled={disabled}
        className={`${styles.btn} ${styles[variant]} ${styles[color]} ${disabledClass} ${classes}`}
        {...other}
      >
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        <span>{props.children}</span>
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </Link>
    );
  } else {
    return (
      <button
        href={href}
        disabled={disabled}
        className={`${styles.btn} ${styles[variant]} ${styles[color]} ${disabledClass} ${classes}`}
        {...other}
      >
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        <span>{props.children}</span>
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </button>
    );
  }
}

export default Button;
