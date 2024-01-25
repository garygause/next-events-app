import { useRouter } from 'next/router';

import EventSummary from '@/components/EventDetails/event-summary';
import EventLogistics from '@/components/EventDetails/event-logistics';
import EventContent from '@/components/EventDetails/event-content';

import { getEventById } from '../../../events';

export default function EventDetails() {
  const router = useRouter();
  const id = router.query.eventId;
  const event = getEventById(id);
  return (
    <>
      {!event && <p>Event not found!</p>}
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
