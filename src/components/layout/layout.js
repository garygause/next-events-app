import Link from 'next/link';

import Header from '@ui/Header/Header';

export default function Layout(props) {
  const navLinks = [
    {
      id: 'link-events',
      link: '/events',
      title: 'Browse All Events',
    },
  ];

  return (
    <>
      <Header
        logoLink="/"
        title="NextEvents"
        navLinks={navLinks}
        logo="/logo.svg"
      />
      <main>{props.children}</main>
    </>
  );
}
