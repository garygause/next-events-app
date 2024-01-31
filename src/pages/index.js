import Head from 'next/head';

import EventList from '@/components/EventList/EventList';

export default function HomePage(props) {
  return (
    <div>
      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  return fetch(
    'https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const featuredEvents = [];
      for (const key in data) {
        data[key].isFeatured && featuredEvents.push({ id: key, ...data[key] });
      }
      return { props: { events: featuredEvents }, revalidate: 1800 };
    });
}
