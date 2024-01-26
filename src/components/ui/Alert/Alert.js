import styles from './Alert.module.css';

export default function Alert(props) {
  const {
    children,
    color = 'primary',
    classes = '',
    variant = 'contained',
    ...other
  } = props;

  return (
    <div
      className={`${styles.alert} ${styles[variant]} ${styles[color]} ${classes}`}
      {...other}
    >
      {children}
    </div>
  );
}
