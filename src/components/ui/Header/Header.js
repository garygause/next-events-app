import Link from 'next/link';
import Image from 'next/image';

import styles from './Header.module.css';

export default function Header(props) {
  const { logoLink, logo, title, navLinks } = props;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={logoLink}>
          {logo && (
            <span>
              <Image src={logo} alt={title} width="30" height="30" />
            </span>
          )}
          <span>{title}</span>
        </Link>
      </div>
      {navLinks && (
        <nav className={styles.navigation}>
          <ul>
            {navLinks.map((navElement) => (
              <li key={navElement.id}>
                <Link href={navElement.link}>{navElement.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
