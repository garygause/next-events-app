import { useEffect, useState } from 'react';
import EventList from '@/components/EventList/EventList';

export default function HomePage() {
  const [events, setEvents] = useState();

  useEffect(() => {
    fetch('https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json')
      .then((response) => response.json())
      .then((data) => {
        const featuredEvents = [];
        for (const key in data) {
          data[key].isFeatured &&
            featuredEvents.push({ id: key, ...data[key] });
        }
        setEvents(featuredEvents);
      });
  }, []);

  if (!events) {
    return <p>No events found.</p>;
  }

  return (
    <div>
      <EventList events={events} />
    </div>
  );
}
