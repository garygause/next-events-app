import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import EventSummary from '@/components/EventDetails/EventSummary';
import EventLogistics from '@/components/EventDetails/EventLogistics';
import EventContent from '@/components/EventDetails/EventContent';
import Alert from '@ui/Alert';

export default function EventDetails() {
  const [event, setEvent] = useState();

  const router = useRouter();
  const id = router.query.eventId;

  useEffect(() => {
    if (id) {
      fetch(
        `https://next-events-5e5e0-default-rtdb.firebaseio.com/events/${id}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log({ id: id, ...data });
          setEvent({ id: id, ...data });
        });
    }
  }, [id]);

  return (
    <>
      {!event && (
        <Alert variant="outlined" color="secondary">
          Event not found.
        </Alert>
      )}
      {event && (
        <>
          <EventSummary title={event.title} />
          <EventLogistics
            date={event.date}
            address={event.location}
            image={event.image}
            imageAlt={event.title}
          />
          <EventContent>{event.description}</EventContent>
        </>
      )}
    </>
  );
}
