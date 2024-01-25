import Link from 'next/link';

import styles from './Button.module.css';

function Button(props) {
  // variant = contained, outlined, text
  // color = primary, seconday, danger

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

  let disabledClass = disabled ? 'disabled' : '';

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
}

export default Button;
