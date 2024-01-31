import Alert from '@ui/Alert';
import Button from '@ui/Button';
import EventList from '@/components/EventList/EventList';
import ResultsTitle from '@/components/ResultsTitle/ResultsTitle';

export default function FilteredEvents({ events, date, hasError }) {
  if (hasError) {
    return showError();
  }

  if (!events || events.length == 0) {
    return (
      <>
        <Alert variant="outlined" color="secondary">
          No Matches Found.
        </Alert>
        <div className="center">
          <Button href="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const searchDate = new Date(date.year, date.month - 1);

  return (
    <>
      <ResultsTitle date={searchDate} />
      <EventList events={events} />
    </>
  );
}

function showError() {
  return (
    <>
      <Alert variant="outlined" color="danger">
        Invalid search parameters. Please try again.
      </Alert>
      <div className="center">
        <Button href="/events">Show All Events</Button>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const routeData = params.slug;

  const year = +routeData[0];
  const month = +routeData[1];
  if (isNaN(year) || isNaN(month)) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const events = await fetch(
    'https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }
      const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
        );
      });
      return filteredEvents;
    });

  return {
    props: { events: events, date: { year: year, month: month } },
  };
}
