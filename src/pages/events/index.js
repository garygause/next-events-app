import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import EventList from '@/components/EventList/EventList';
import EventSearch from '@/components/EventSearch/EventSearch';

export default function EventsPage(props) {
  const [events, setEvents] = useState(props.events);
  const router = useRouter();

  const { data, error } = useSWR(
    'https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  );
  useEffect(() => {
    const allEvents = [];
    for (const key in data) {
      allEvents.push({ id: key, ...data[key] });
    }
    setEvents(allEvents);
  }, [data]);

  if (error) {
    return <p>An error occurred. Please try again.</p>;
  }
  if (!events && !data) {
    return <p>Loading...</p>;
  }

  function searchHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventSearch onSearch={searchHandler} />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  return fetch(
    'https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const allEvents = [];
      for (const key in data) {
        allEvents.push({ id: key, ...data[key] });
      }
      return { props: { events: allEvents }, revalidate: 1800 };
    });
}
