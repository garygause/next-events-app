import { useEffect, useState } from 'react';
import useSWR from 'swr';

import EventList from '@/components/EventList/EventList';

export default function HomePage(props) {
  const [events, setEvents] = useState(props.events);

  const { data, error } = useSWR(
    'https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const featuredEvents = [];
    for (const key in data) {
      data[key].isFeatured && featuredEvents.push({ id: key, ...data[key] });
    }
    setEvents(featuredEvents);
  }, [data]);

  if (error) {
    return <p>An error occurred. Please try again.</p>;
  }
  if (!events && !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventList events={events} />
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
      return { props: { events: featuredEvents }, revalidate: 10 };
    });
}
