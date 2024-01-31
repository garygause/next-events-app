import EventSummary from '@/components/EventDetails/EventSummary';
import EventLogistics from '@/components/EventDetails/EventLogistics';
import EventContent from '@/components/EventDetails/EventContent';
import Alert from '@ui/Alert';

export default function EventDetails({ event }) {
  return (
    <>
      {!event && (
        <Alert variant="outlined" color="secondary">
          Loading...
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

export async function getStaticProps(context) {
  const id = context.params.eventId;
  return fetch(
    `https://next-events-5e5e0-default-rtdb.firebaseio.com/events/${id}.json`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log({ id: id, ...data });
      return {
        props: { event: { id: id, ...data } },
        revalidate: 30,
      };
    });
}

export async function getStaticPaths() {
  return fetch(
    `https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json`
  )
    .then((response) => response.json())
    .then((data) => {
      const paths = [];
      for (const key in data) {
        paths.push({ params: { eventId: key } });
      }
      return {
        paths: paths,
        fallback: true,
      };
    });
}
