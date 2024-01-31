import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import EventList from '@/components/EventList/EventList';
import EventSearch from '@/components/EventSearch/EventSearch';

export default function EventsPage() {
  const [events, setEvents] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch('https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json')
      .then((response) => response.json())
      .then((data) => {
        const allEvents = [];
        for (const key in data) {
          allEvents.push({ id: key, ...data[key] });
        }
        setEvents(allEvents);
      });
  }, []);

  if (!events) {
    return <p>No events found.</p>;
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
