import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Alert from '@ui/Alert';
import Button from '@ui/Button';
import EventList from '@/components/EventList/EventList';
import ResultsTitle from '@/components/ResultsTitle/ResultsTitle';

export default function FilteredEvents(props) {
  const [events, setEvents] = useState();

  const router = useRouter();
  const data = router.query.slug;

  let year,
    month = 0;

  useEffect(() => {
    fetch('https://next-events-5e5e0-default-rtdb.firebaseio.com/events.json')
      .then((response) => response.json())
      .then((data) => {
        const events = [];
        for (const key in data) {
          events.push({ id: key, ...data[key] });
        }
        const filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1
          );
        });
        setEvents(filteredEvents);
      });
  }, [year, month]);

  if (!data) {
    return showError();
  }

  year = +data[0];
  month = +data[1];
  if (isNaN(year) || isNaN(month)) {
    return showError();
  }

  //const events = getFilteredEvents({ year: year, month: month });
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

  const searchDate = new Date(year, month - 1);
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
